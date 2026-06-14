import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Unsupported file type! Only images and videos are allowed."),
        false,
      );
    }
  },
});

export const checkMediaSize = (req, res, next) => {
  if (!req.file) return next();

  const { size, mimetype } = req.file;
  const isImage = mimetype.startsWith("image/");
  const isVideo = mimetype.startsWith("video/");

  if (isImage && size > 10 * 1024 * 1024) {
    return res
      .status(400)
      .json({ message: "Image file size cannot exceed 10 MB" });
  }

  if (isVideo && size > 100 * 1024 * 1024) {
    return res
      .status(400)
      .json({ message: "Video file size cannot exceed 100 MB" });
  }

  next();
};

export const uploadToCloudinaryMiddleware = (folder = "uploads") => {
  return async (req, res, next) => {
    if (!req.file) return next();

    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const customName = req.user
        ? `${req.user.username}_${req.user.userId}_${Date.now()}`
        : `${Date.now()}_${req.file.originalname}`;

      // Determine subfolder based on file type
      const isImage = req.file.mimetype.startsWith("image/");
      const isVideo = req.file.mimetype.startsWith("video/");
      
      let finalFolder = folder;
      if (isImage) {
        finalFolder = `${folder}/images`;
      } else if (isVideo) {
        finalFolder = `${folder}/videos`;
      }

      const uploadResult = await uploadToCloudinary(
        dataURI,
        finalFolder,
        customName,
      );

      req.cloudinaryUrl = uploadResult.secure_url;

      next();
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res
        .status(500)
        .json({ message: "Failed to upload file to Cloudinary" });
    }
  };
};

export default upload;
