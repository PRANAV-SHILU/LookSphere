import cloudinary from "../config/cloudinary.js";

export async function uploadToCloudinary(file) {
  return await cloudinary.uploader.upload(file);
}

export async function deleteFromCloudinary(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
