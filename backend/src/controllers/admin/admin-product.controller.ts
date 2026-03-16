import { Request, Response, NextFunction } from "express";
import { AdminAddProductService } from "../../services/admin/admin-product.service.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryImageUploadService } from "../../services/cloudinary/cloudinary.service.js";
import fs from "fs/promises";

export async function AddProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title, msrp, price, stock, description } = req.body;
  const { email, role } = req.user;
  const files = req.files as Express.Multer.File[];
  let cloudinaryUploads: { url: string; publicId: string }[] = [];
  try {
    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "You do not have permission to make these changes." });
    }
    if (!files || files.length < 1 || files.length > 5) {
      return res
        .status(400)
        .json({ message: "Atleast 1 and atmost 5 images are required" });
    }
    // upload images to cloudinary and get the urls
    const imageUploadPromises = files.map((image: Express.Multer.File) =>
      CloudinaryImageUploadService("product_images", image.path),
    );
    cloudinaryUploads = await Promise.all(imageUploadPromises);
    //Delete the files off the  server immediately! Do not wait for garbage collector.
    for (const file of files) {
      await fs
        .unlink(file.path)
        .catch((err) =>
          console.error("Failed to delete local temp file:", err),
        );
    }

    const formedProduct = {
      title,
      msrp,
      price,
      stock,
      description,
      images: cloudinaryUploads.map((images) => images.publicId),
    };
    //add product to db
    await AdminAddProductService({ product: formedProduct, email });
    return res
      .status(200)
      .json({ message: "Product has been added succesfully" });
  } catch (e) {
    // delete if product fails to add
    for (const file of files) {
      await fs
        .unlink(file.path)
        .catch((err) =>
          console.error("Failed to delete local temp file:", err),
        );
    }

    const cloudinaryDeletePromises = cloudinaryUploads.map((image) =>
      cloudinary.uploader.destroy(image.publicId),
    );
    await Promise.all(cloudinaryDeletePromises).catch((err) =>
      console.error("Failed to clean up Cloudinary orphans:", err),
    );

    console.error("Error while adding product", e);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}
