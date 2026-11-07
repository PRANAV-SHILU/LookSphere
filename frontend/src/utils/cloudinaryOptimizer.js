/**
 * Cloudinary Media & Video Optimizer
 * Safely parses Cloudinary URLs without affecting folder paths like /uploads/videos/
 */

const CLOUDINARY_UPLOAD_REGEX = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video|raw)\/upload\/)/i;

/**
 * Injects or updates transformation parameters in a Cloudinary URL safely.
 * Will NEVER alter folder names (like /uploads/videos/) because it strictly
 * operates between /(image|video|raw)/upload/ and /v<digits>/.
 */
function applyTransformations(url, newTransformations = "") {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) return url;

  const match = url.match(CLOUDINARY_UPLOAD_REGEX);
  if (!match) return url;

  const endpoint = match[1]; // e.g. "https://res.cloudinary.com/djc2vyi3i/video/upload/"
  const afterEndpoint = url.slice(endpoint.length);

  // Separate transformations from version and folder path
  const versionIndex = afterEndpoint.search(/\/v\d+\//);
  let existingTransforms = "";
  let restOfUrl = afterEndpoint;

  if (versionIndex !== -1) {
    existingTransforms = afterEndpoint.slice(0, versionIndex);
    restOfUrl = afterEndpoint.slice(versionIndex + 1); // "v178.../uploads/videos/abc.mp4"
  }

  // Merge transformations avoiding duplicates
  const existingSet = new Set(existingTransforms.split(",").filter(Boolean));
  const newItems = newTransformations.split(",").filter(Boolean);

  for (const item of newItems) {
    const key = item.split("_")[0];
    for (const ex of existingSet) {
      if (ex.startsWith(`${key}_`) || ex === item) {
        existingSet.delete(ex);
      }
    }
    existingSet.add(item);
  }

  const finalTransformStr = Array.from(existingSet).join(",");
  return `${endpoint}${finalTransformStr}/${restOfUrl}`;
}

/**
 * Optimizes video URLs for fast playback capped at 1080p Full HD.
 * Uses 'c_limit' so smaller videos are never upscaled, and 'vc_auto' for modern codecs.
 */
export function getOptimizedVideoUrl(url, options = {}) {
  if (!url || !url.includes("cloudinary.com")) return url;
  const { maxResolution = 1080 } = options;

  return applyTransformations(
    url,
    `w_${maxResolution},c_limit,vc_auto,q_auto,f_auto`
  );
}

/**
 * Optimizes image URLs by setting width limit and modern formats.
 */
export function getOptimizedMediaUrl(url, options = {}) {
  if (!url || !url.includes("cloudinary.com")) return url;
  const { width = 400, quality = "auto", format = "auto" } = options;

  return applyTransformations(
    url,
    `w_${width},c_limit,q_${quality},f_${format}`
  );
}

/**
 * Generates an optimized video poster (thumbnail frame) from a Cloudinary video URL.
 * Grabs a frame at one second (so_1), sets width, and converts to .jpg.
 */
export function getVideoPosterUrl(url, width = 600) {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Change video extension (.mp4, .mov, etc.) to .jpg
  const posterUrl = url.replace(/\.(mp4|webm|ogg|mov)$/i, ".jpg");

  return applyTransformations(
    posterUrl,
    `so_1,w_${width},c_limit,q_auto,f_auto`
  );
}
