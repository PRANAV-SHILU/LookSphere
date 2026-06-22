/**
 * Optimizes Cloudinary media URLs by injecting transformation parameters.
 * E.g., resizes images to a specific width and applies automatic quality/format compression.
 */
export function getOptimizedMediaUrl(url, options = {}) {
  if (!url) return "";

  // Only apply transformations to Cloudinary URLs
  if (!url.includes("cloudinary.com")) return url;

  const { width = 400, quality = "auto", format = "auto" } = options;

  // Cloudinary URL structure: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>
  // We want to insert the transformation string (e.g. w_400,c_scale,q_auto,f_auto) right after "upload/"
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const insertionPoint = uploadIndex + "/upload/".length;
  const beforeUpload = url.substring(0, insertionPoint);
  const afterUpload = url.substring(insertionPoint);

  // Skip adding transformations if they are already present in the URL
  if (afterUpload.startsWith("w_") || afterUpload.includes("q_auto") || afterUpload.includes("f_auto")) {
    return url;
  }

  const transformation = `w_${width},c_scale,q_${quality},f_${format}/`;
  return `${beforeUpload}${transformation}${afterUpload}`;
}

/**
 * Generates an optimized video poster (thumbnail) from Cloudinary video URLs.
 * Replaces the video extension (e.g. .mp4) with .jpg and applies scale transformations.
 */
export function getVideoPosterUrl(url, width = 400) {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;

  // Replace video extension with jpg
  const posterUrl = url.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg");

  return getOptimizedMediaUrl(posterUrl, { width, quality: "auto", format: "jpg" });
}
