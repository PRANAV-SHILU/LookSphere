import { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Info, Eye, MoreVertical, User as UserIcon } from "lucide-react";
import { modifyPost } from "../services/postService";
import { fetchUserDetail } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../schema/postSchema";
import { PostDetailModal as PostDetailModalAnimation } from "../utils/animation";

export default function PostDetailModal({ isOpen, onClose, post }) {
  const navigate = useNavigate();
  const [mediaDimensions, setMediaDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState("");
  const [editAltText, setEditAltText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [captionError, setCaptionError] = useState("");
  const [altTextError, setAltTextError] = useState("");
  const [author, setAuthor] = useState(null);
  const overlayRef = useRef(null);
  const prevPostRef = useRef(null);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isOwner = post && currentUser && currentUser._id === post.userId;

  // Initialize edit fields when edit mode starts or post changes
  useEffect(() => {
    if (post) {
      setEditCaption(post.caption || "");
      setEditAltText(post.altText || "");
      setAuthor(null);

      // Fetch author profile details (username and image)
      if (post.userId) {
        fetchUserDetail(post.userId)
          .then((data) => setAuthor(data))
          .catch((err) =>
            console.error("Error loading post author details:", err),
          );
      }
    }
  }, [post]);

  // Reset state when post changes (ref-based, no setState in effect)
  const postUrl = post?.mediaUrl ?? null;
  if (postUrl !== prevPostRef.current) {
    prevPostRef.current = postUrl;
    setIsEditing(false);
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
      if (isEditing) return; // Prevent closing when editing
      setShowMenu(false);
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
          {...PostDetailModalAnimation.backdropTransition}
        >
          <Motion.div
            className="post-detail-container"
            {...PostDetailModalAnimation.dialogTransition}
          >
            {/* Post Options Menu */}
            {isOwner && (
              <div
                className="post-detail-options-container"
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "42px",
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="post-detail-options-btn"
                  aria-label="Options"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <MoreVertical size={20} />
                </button>

                <AnimatePresence>
                  {showMenu && (
                    <Motion.div
                      className="post-detail-dropdown"
                      {...PostDetailModalAnimation.dropdownTransition}
                      style={{
                        position: "absolute",
                        top: "42px",
                        right: 0,
                        backgroundColor: "var(--surface-card)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-sm)",
                        padding: "4px",
                        boxShadow: "var(--shadow-card)",
                        zIndex: 11,
                        minWidth: "120px",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (isEditing) {
                            setIsEditing(false);
                            setEditCaption(post.caption || "");
                            setEditAltText(post.altText || "");
                            setCaptionError("");
                            setAltTextError("");
                            requestAnimationFrame(() => {
                              if (overlayRef.current) {
                                overlayRef.current.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }
                            });
                          } else {
                            setIsEditing(true);
                            requestAnimationFrame(() => {
                              if (overlayRef.current) {
                                overlayRef.current.scrollTo({
                                  top: overlayRef.current.scrollHeight,
                                  behavior: "smooth",
                                });
                              }
                            });
                          }
                          setShowMenu(false);
                        }}
                        className="post-detail-dropdown-item"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          color: "var(--text-primary)",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          borderRadius: "4px",
                          transition: "background-color 0.15s",
                        }}
                      >
                        {isEditing ? "Cancel Edit" : "Edit Post"}
                      </button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Author Profile Info */}
            {author && (
              <div
                onClick={() => {
                  onClose();
                  if (currentUser && currentUser._id === author._id) {
                    navigate("/profile");
                  } else {
                    navigate(`/profile/${author.username}`);
                  }
                }}
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  color: "#fff",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.3)",
                  }}
                >
                  {author.profileImage ? (
                    <img
                      src={author.profileImage}
                      alt={author.username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <UserIcon size={16} />
                  )}
                </div>
                <span
                  style={{
                    fontSize: "0.925rem",
                    fontWeight: "600",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {author.username}
                </span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                setIsEditing(false);
                onClose();
              }}
              className="post-detail-close-btn"
              aria-label="Close"
              style={{ right: "-4px" }}
            >
              <X size={22} />
            </button>

            {/* Media Area */}
            <div
              className="post-detail-media-wrapper mt-0.5"
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
                  alt={editAltText || editCaption || "Post"}
                  className="post-detail-media"
                  draggable={false}
                  onLoad={handleImageLoad}
                  style={{ opacity: isLoaded ? 1 : 0 }}
                />
              )}

              {/* Alt Text Info Button */}
              {!isEditing && post.altText && isLoaded && (
                <div className="post-detail-alt-trigger">
                  <Info size={16} />
                  <div className="post-detail-alt-tooltip">{post.altText}</div>
                </div>
              )}
            </div>

            {/* Post Info Footer */}
            {(isEditing || post.postViewCount != null || post.caption) && (
              <div
                className="post-detail-caption"
                style={{ width: "100%", maxWidth: "100%" }}
              >
                {isEditing ? (
                  <div className="flex flex-col gap-4">
                    <div className="input-group" style={{ marginBottom: "0" }}>
                      <label
                        className="input-label"
                        style={{ fontSize: "0.85rem", fontWeight: "600" }}
                      >
                        Caption
                      </label>
                      <textarea
                        className="input-field"
                        rows={5}
                        cols={45}
                        placeholder="Write a caption..."
                        value={editCaption}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditCaption(val);
                          if (val.length > 500) {
                            setCaptionError(
                              "Caption cannot exceed 500 characters",
                            );
                          } else {
                            setCaptionError("");
                          }
                        }}
                        style={{ resize: "both" }}
                      />
                      {captionError && (
                        <p
                          style={{
                            color: "var(--status-error)",
                            fontSize: "0.8rem",
                            marginTop: "0.4rem",
                          }}
                        >
                          {captionError}
                        </p>
                      )}
                      <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span>Add context to your post</span>
                        <span
                          style={{
                            color:
                              editCaption.length >= 500
                                ? "var(--status-error)"
                                : "inherit",
                            fontWeight:
                              editCaption.length >= 500 ? "600" : "normal",
                          }}
                        >
                          {editCaption.length}/500
                        </span>
                      </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: "0" }}>
                      <label
                        className="input-label"
                        style={{ fontSize: "0.85rem", fontWeight: "600" }}
                      >
                        Alt Text (Alternative text)
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Describe this media for accessibility..."
                        value={editAltText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditAltText(val);
                          if (val.length > 50) {
                            setAltTextError(
                              "Alt text cannot exceed 50 characters",
                            );
                          } else {
                            setAltTextError("");
                          }
                        }}
                      />
                      {altTextError && (
                        <p
                          style={{
                            color: "var(--status-error)",
                            fontSize: "0.8rem",
                            marginTop: "0.4rem",
                          }}
                        >
                          {altTextError}
                        </p>
                      )}
                      <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span>Helps users with screen readers</span>
                        <span
                          style={{
                            color:
                              editAltText.length >= 50
                                ? "var(--status-error)"
                                : "inherit",
                            fontWeight:
                              editAltText.length >= 50 ? "600" : "normal",
                          }}
                        >
                          {editAltText.length}/50
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-1">
                      <button
                        type="button"
                        disabled={isSaving}
                        className="btn btn-secondary w-full"
                        onClick={() => {
                          setIsEditing(false);
                          setEditCaption(post.caption || "");
                          setEditAltText(post.altText || "");
                          setCaptionError("");
                          setAltTextError("");
                          if (overlayRef.current) {
                            overlayRef.current.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={
                          isSaving ||
                          editCaption.length > 500 ||
                          editAltText.length > 50
                        }
                        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={async () => {
                          try {
                            await postSchema.validate({
                              caption: editCaption,
                              altText: editAltText,
                            });
                          } catch (err) {
                            toast.error(err.message);
                            return;
                          }

                          setIsSaving(true);
                          try {
                            const payload = {};
                            if (
                              editCaption.trim() !== (post.caption || "").trim()
                            ) {
                              payload.caption = editCaption.trim();
                            }
                            if (
                              (editAltText || "").trim() !==
                              (post.altText || "").trim()
                            ) {
                              payload.altText = editAltText.trim();
                            }
                            if (Object.keys(payload).length === 0) {
                              toast.info("No changes to save.");
                              setIsEditing(false);
                              return;
                            }
                            const updated = await modifyPost(post._id, payload);
                            toast.success("Post updated successfully!");
                            post.caption = updated.caption;
                            post.altText = updated.altText;
                            setIsEditing(false);
                          } catch (err) {
                            toast.error(err.message || "Failed to save post.");
                          } finally {
                            setIsSaving(false);
                          }
                        }}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {post.postViewCount != null && (
                      <div
                        className="post-detail-views"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Eye size={16} />
                          <span>
                            {post.postViewCount}{" "}
                            {post.postViewCount === 1 ? "view" : "views"}
                          </span>
                        </div>
                        {post.createdAt && (
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            {new Date(post.createdAt).toLocaleString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    )}
                    {post.caption && <p>{post.caption}</p>}
                  </>
                )}
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
