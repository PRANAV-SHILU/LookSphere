import { useState, useEffect, useRef } from "react";
import { X, Plus, Upload } from "lucide-react";
import { toast } from "react-toastify";

import { postSchema } from "../schema/postSchema";

export default function UploadMediaModal({
  isOpen,
  onClose,
  mediaType,
  onSubmit,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");
  const [captionError, setCaptionError] = useState("");
  const [altTextError, setAltTextError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  // Hover states for elements
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);

  // Revoke object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (mediaType === "Image" && !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (mediaType === "Video" && !file.type.startsWith("video/")) {
      toast.error("Please select a valid video file.");
      e.target.value = "";
      return;
    }

    const maxSize = mediaType === "Image" ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
    const maxSizeLabel = mediaType === "Image" ? "10 MB" : "100 MB";

    if (file.size > maxSize) {
      toast.error(`${mediaType} file size cannot exceed ${maxSizeLabel}.`);
      e.target.value = "";
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      await postSchema.validate({ caption, altText });
    } catch (err) {
      toast.error(err.message);
      return;
    }

    onSubmit({ file: selectedFile, caption, altText });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl("");
    setCaption("");
    setAltText("");
    setCaptionError("");
    setAltTextError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
      >
        <div
          className="relative w-full max-w-lg overflow-hidden border flex flex-col max-h-[90vh]"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--border-normal)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "var(--border-light)" }}
          >
            <h3
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Upload {mediaType === "Image" ? "Image" : "Video"}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors border-none cursor-pointer"
              style={{
                color: isCloseHovered ? "var(--text-primary)" : "var(--text-muted)",
                backgroundColor: isCloseHovered ? "var(--surface-hover)" : "transparent"
              }}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 flex flex-col gap-5"
          >
            {/* Input Trigger */}
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept={mediaType === "Image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              multiple={false}
            />

            {!selectedFile ? (
              /* Selection State */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-12 px-4 border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors duration-200"
                style={{
                  borderColor: isUploadHovered ? "var(--primary-500)" : "var(--border-strong)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isUploadHovered ? "var(--surface-hover)" : "var(--surface-input)"
                }}
                onMouseEnter={() => setIsUploadHovered(true)}
                onMouseLeave={() => setIsUploadHovered(false)}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: "var(--bg-primary)" }}
                >
                  <Upload size={24} style={{ color: "var(--primary-500)" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Click to select {mediaType === "Image" ? "an image" : "a video"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {mediaType === "Image" ? "Max size: 10 MB" : "Max size: 100 MB"}
                  </p>
                </div>
              </div>
            ) : (
              /* Fields & Preview State */
              <>
                {/* Preview Panel */}
                <div
                  className="w-[200px] h-[200px] mx-auto flex items-center justify-center relative group"
                  style={{
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-secondary)"
                  }}
                >
                  {previewUrl &&
                    (mediaType === "Image" ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <video
                        src={previewUrl}
                        className="w-full h-full object-cover"
                        controls
                        draggable={false}
                      />
                    ))}
                  {/* Change File button overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-secondary"
                      style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }}
                    >
                      Change File
                    </button>
                  </div>
                </div>

                 {/* Caption */}
                <div className="input-group">
                  <label className="input-label">Caption</label>
                  <textarea
                    className="input-field"
                    rows={5}
                    style={{ resize: "vertical" }}
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCaption(val);
                      if (val.length > 500) {
                        setCaptionError("Caption cannot exceed 500 characters");
                      } else {
                        setCaptionError("");
                      }
                    }}
                  />
                  {captionError && (
                    <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.4rem" }}>
                      {captionError}
                    </p>
                  )}
                  <div
                    className="flex justify-between mt-1.5 px-0.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>Add context to your post</span>
                    <span style={{ color: caption.length >= 500 ? "var(--status-error)" : "inherit", fontWeight: caption.length >= 500 ? "600" : "normal" }}>
                      {caption.length}/500
                    </span>
                  </div>
                </div>

                {/* Alt Text */}
                <div className="input-group">
                  <label className="input-label">Alt Text (Alternative text)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Describe this media for accessibility..."
                    value={altText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAltText(val);
                      if (val.length > 50) {
                        setAltTextError("Alt text cannot exceed 50 characters");
                      } else {
                        setAltTextError("");
                      }
                    }}
                  />
                  {altTextError && (
                    <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.4rem" }}>
                      {altTextError}
                    </p>
                  )}
                  <div
                    className="flex justify-between mt-1.5 px-0.5 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>Helps users with screen readers</span>
                    <span style={{ color: altText.length >= 50 ? "var(--status-error)" : "inherit", fontWeight: altText.length >= 50 ? "600" : "normal" }}>
                      {altText.length}/50
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedFile || caption.length > 500 || altText.length > 50}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
