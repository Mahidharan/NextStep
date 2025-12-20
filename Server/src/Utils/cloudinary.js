import { v2 as cloudinary } from "cloudinary";
import fs, { access } from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      access_mode: "public",
    });

    console.log(`File Uploaded on cloudinary ☁️. File src ${response.url}`);

    //Deleting in local server after upload
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadCloudinary };
