import cloudinary from "../config/cloudinaryConfig.js";

export async function uploadToCloudinary(file, folder = "secureauth", customName = null) {
  const options = {
    folder,
    resource_type: "auto",
  };
  
  if (customName) {
    options.public_id = customName;
  }

  return await cloudinary.uploader.upload(file, options);
}

export async function deleteFromCloudinary(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
