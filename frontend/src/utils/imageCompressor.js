/**
 * Compresses an image in the browser via canvas before upload.
 * Preserves high visual quality while dropping file size by 70-90%.
 */
export async function compressImage(file, { maxWidth = 2048, maxHeight = 2048, quality = 0.90 } = {}) {
  if (!file || !file.type?.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { naturalWidth: w, naturalHeight: h } = img;

      if (w <= maxWidth && h <= maxHeight && file.size <= 500 * 1024) {
        return resolve(file);
      }

      const ratio = Math.min(maxWidth / w, maxHeight / h, 1);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mime = file.type === "image/png" ? "image/webp" : "image/jpeg";
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) return resolve(file);
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, mime === "image/webp" ? ".webp" : ".jpg"), { type: mime }));
        },
        mime,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}
