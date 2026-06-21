import cloudinary from "../config/cloudinaryConfig.js";

export async function uploadToCloudinary(file, folder = "uploads", customName = null) {
  const options = {
    folder,
    resource_type: "auto",
  };
  
  if (customName) {
    options.public_id = customName;
  }

  const result = await cloudinary.uploader.upload(file, options);
  
  // Inject Cloudinary delivery transformations to automatically convert 
  // to next-gen formats (WebP/AVIF) and compress quality
  if (result && result.secure_url) {
    result.secure_url = result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
  }
  
  return result;
}

export async function deleteFromCloudinary(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
