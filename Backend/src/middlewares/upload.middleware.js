import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Setting a global hard cap at 100MB for Multer
  }
});

export const checkMediaSize = (req, res, next) => {
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);

  // If the frontend sends a custom header, we can dynamically reject images early
  const type = req.headers["x-media-type"]; 

  if (type === "Image" && contentLength > 10 * 1024 * 1024) {
    return res.status(400).json({ message: "Image file size cannot exceed 10 MB" });
  }

  if (contentLength > 100 * 1024 * 1024) {
    return res.status(400).json({ message: "Video file size cannot exceed 100 MB" });
  }

  next();
};

export default upload;
