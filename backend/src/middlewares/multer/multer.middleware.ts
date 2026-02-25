import multer from "multer";
import { Request, Response, NextFunction } from "express";

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
  fileFilter: (req, file, cb) => {
    // use cb here becuse multer does not handle errors thrown in fileFilter. It runs a cb function.
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const allowedExtensions = [".jpeg", ".jpg", ".png", ".webp"];
    const fileExtension = file.originalname.split(".").pop()?.toLowerCase();
    if (
      !allowedTypes.includes(file.mimetype) ||
      !fileExtension ||
      !allowedExtensions.includes(`.${fileExtension}`)
    ) {
      // Pass the error into the callback instead of returning it
      return cb(
        new Error("Only image files (jpeg, jpg, png, webp) are allowed."),
      );
    }
    // Pass (null, true) to accept the file
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // similarly we use cb here because multer does not handle errors thrown in destination.
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  }),
});

export async function MulterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  upload.array("images", 5)(req, res, (err: any) => {
    // multer errors
    if (err instanceof multer.MulterError) {
      console.error("Multer Error", err);
      return res.status(400).json({ message: "Check for file size" });
    }
    // check for other errors
    if (err) {
      console.error("File Upload Error", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}
