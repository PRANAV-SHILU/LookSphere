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
    result.secure_url = result.secure_url.replace(
      /((?:image|video|raw)\/upload)\/(?!(?:f_auto|q_auto))/,
      "$1/q_auto,f_auto/"
    );
  }
  
  return result;
}

export async function deleteFromCloudinary(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

/**
 * Extracts Cloudinary public_id from a delivery URL
 */
export function getPublicIdFromUrl(url) {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return null;

  // 1. Cloudinary includes /v<timestamp>/ right before public_id
  const versionMatch = url.match(/\/v\d+\/(.+?)(?:\.[^.]+)?$/);
  if (versionMatch) return versionMatch[1];

  // 2. Fallback if no version number is present in URL
  const uploadMatch = url.match(
    /\/(?:image|video|raw)\/upload\/(?:[^\/]+\/)*?([^\/].+?)(?:\.[^.]+)?$/
  );
  return uploadMatch ? uploadMatch[1] : null;
}

/**
 * Moves an asset in Cloudinary to the 'deleted' folder and removes it from its original folder
 */
export async function moveToDeletedFolder(url) {
  try {
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) return null;

    const fileName = publicId.split("/").pop();
    const newPublicId = `deleted/${fileName}`;

    // 1. Rename public_id
    const result = await cloudinary.uploader.rename(publicId, newPublicId, {
      overwrite: true,
      invalidate: true,
    });

    // 2. Update asset_folder so it moves in the Cloudinary Media Library dashboard UI
    try {
      await cloudinary.api.update(newPublicId, {
        asset_folder: "deleted",
      });
    } catch (folderErr) {
      console.warn("Could not update asset_folder:", folderErr.message);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary move to deleted folder failed:", error);
    return null;
  }
}
