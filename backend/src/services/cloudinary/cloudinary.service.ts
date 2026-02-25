import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function CloudinaryImageUploadService(folder:string, filePath: string) {
  const options = {
    folder:folder,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  const result = await cloudinary.uploader.upload(filePath, options);
  return {url:result.secure_url, publicId:result.public_id};
}
