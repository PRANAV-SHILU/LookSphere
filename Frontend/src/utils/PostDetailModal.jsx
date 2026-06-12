import { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Info, Eye } from "lucide-react";

export default function PostDetailModal({ isOpen, onClose, post }) {
  const [mediaDimensions, setMediaDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const overlayRef = useRef(null);
  const prevPostRef = useRef(null);

  // Reset state when post changes (ref-based, no setState in effect)
  const postUrl = post?.mediaUrl ?? null;
  if (postUrl !== prevPostRef.current) {
    prevPostRef.current = postUrl;
    if (isLoaded) setIsLoaded(false);
    if (mediaDimensions.width !== 0 || mediaDimensions.height !== 0) {
      setMediaDimensions({ width: 0, height: 0 });
    }
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const isVideo = post.mediaType === "Video";

  // Calculate constrained dimensions to fit viewport
  const getConstrainedSize = (naturalW, naturalH) => {
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.75; // leave room for caption below
    const minSize = 500;

    let w = naturalW;
    let h = naturalH;

    // Scale up if both dimensions are below minimum
    const larger = Math.max(w, h);
    if (larger < minSize) {
      const ratio = minSize / larger;
      w = w * ratio;
      h = h * ratio;
    }

    // Scale down if too wide
    if (w > maxW) {
      const ratio = maxW / w;
      w = maxW;
      h = h * ratio;
    }
    // Scale down if still too tall
    if (h > maxH) {
      const ratio = maxH / h;
      h = maxH;
      w = w * ratio;
    }

    return { width: Math.round(w), height: Math.round(h) };
  };

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setMediaDimensions(getConstrainedSize(naturalWidth, naturalHeight));
    setIsLoaded(true);
  };

  const handleVideoLoad = (e) => {
    const { videoWidth, videoHeight } = e.target;
    setMediaDimensions(getConstrainedSize(videoWidth, videoHeight));
    setIsLoaded(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          ref={overlayRef}
          className="post-detail-overlay"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Motion.div
            className="post-detail-container"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="post-detail-close-btn"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Media Area */}
            <div
              className="post-detail-media-wrapper"
              style={
                isLoaded
                  ? {
                      width: mediaDimensions.width,
                      height: mediaDimensions.height,
                    }
                  : { width: 500, height: 500 }
              }
            >
              {!isLoaded && (
                <div className="post-detail-loader">
                  <Motion.div
                    className="post-detail-spinner"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              {isVideo ? (
                <video
                  src={post.mediaUrl}
                  className="post-detail-media"
                  controls
                  controlsList="nodownload"
                  autoPlay
                  loop
                  draggable={false}
                  onLoadedMetadata={handleVideoLoad}
                  style={{ opacity: isLoaded ? 1 : 0 }}
                />
              ) : (
                <img
                  src={post.mediaUrl}
                  alt={post.altText || post.caption || "Post"}
                  className="post-detail-media"
                  draggable={false}
                  onLoad={handleImageLoad}
                  style={{ opacity: isLoaded ? 1 : 0 }}
                />
              )}

              {/* Alt Text Info Button */}
              {post.altText && isLoaded && (
                <div className="post-detail-alt-trigger">
                  <Info size={16} />
                  <div className="post-detail-alt-tooltip">
                    {post.altText}
                  </div>
                </div>
              )}
            </div>

            {/* Post Info Footer */}
            {(post.postViewCount != null || post.caption) && (
              <div className="post-detail-caption">
                {post.postViewCount != null && (
                  <div className="post-detail-views">
                    <Eye size={16} />
                    <span>{post.postViewCount} {post.postViewCount === 1 ? "view" : "views"}</span>
                  </div>
                )}
                {post.caption && <p>{post.caption}</p>}
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
