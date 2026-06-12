import { useState } from "react";
import { useLoaderData, NavLink, Form, useSubmit, useNavigation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { User, Settings, Plus } from "lucide-react";
import BackButton from "../shared-components/BackButton";
import UploadMediaModal from "../utils/UploadMediaModal";
import PostDetailModal from "../utils/PostDetailModal";

export default function OwnProfile() {
  const submit = useSubmit();
  const { data } = useLoaderData();
  const { user, images = [], videos = [] } = data || {};

  const [activeTab, setActiveTab] = useState("images"); // "images" or "videos"
  const [mediaType, setMediaType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleTriggerUpload = (type) => {
    setMediaType(type);
    setIsModalOpen(true);
  };

  const handleModalSubmit = ({ file, caption, altText }) => {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("type", mediaType);
    formData.append("caption", caption);
    formData.append("altText", altText);

    submit(formData, { method: "post", encType: "multipart/form-data" });
    setIsModalOpen(false);
  };

  if (!data)
    return (
      <h2 className="text-center text-muted mt-10">Loading user data...</h2>
    );

  return (
    <>
      <AnimatePresence>
        {isSubmitting && (
          <Motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              className="flex flex-col items-center gap-4 bg-[var(--surface-card)] border border-[var(--border-normal)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] max-w-sm w-full mx-4 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Spinner animation */}
              <Motion.div
                className="w-12 h-12 rounded-full border-4 border-[var(--border-light)] border-t-[var(--primary-500)]"
                style={{ borderTopColor: "var(--primary-500)" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
              <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  Uploading Post
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Please wait, your post is being uploaded and processed.
                </p>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.main
      className="w-full max-w-[1000px] mx-auto pt-8 pb-16 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* --- Back Button --- */}
      <div className="max-w-[600px] mx-auto w-full mb-2">
        <BackButton />
      </div>

      {/* --- Profile Header --- */}
      <section className="max-w-[600px] mx-auto flex flex-col items-start gap-6 justify-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          {user.username}
        </h1>

        <div className="flex flex-row items-start w-full mb-2">
          {/* Profile Image */}
          <div
            className="flex items-center justify-center overflow-hidden border shadow-sm shrink-0"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-strong)",
              borderRadius: "56%",
              width: "150px",
              height: "150px",
              marginInlineEnd: "28px",
              cursor: user.profileImage ? "pointer" : "default",
            }}
            onClick={() =>
              user.profileImage &&
              setSelectedPost({ mediaUrl: user.profileImage, mediaType: "Image" })
            }
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full"
                draggable={false}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                  height: "100%",
                }}
              />
            ) : (
              <User size={40} style={{ color: "var(--text-muted)" }} />
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-start text-left gap-1 mt-2">
            <h3
              className="text-base md:text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {user.tagline}
            </h3>

            <div
              className="my-4 text-sm md:text-base flex gap-4 md:gap-6"
              style={{ color: "var(--text-primary)" }}
            >
              <span>
                <strong className="font-semibold">{user.postCount || 0}</strong>{" "}
                posts
              </span>
              <span>
                <strong className="font-semibold">
                  {user.profileViewCount || 0}
                </strong>{" "}
                profile views
              </span>
              <span>
                <strong className="font-semibold">
                  {user.totalPostViews || 0}
                </strong>{" "}
                post views
              </span>
            </div>

            <p
              className="whitespace-pre-wrap text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}
            >
              {user.bio}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <NavLink
          to="/edit-profile"
          className="btn btn-secondary w-[50%] md:w-full max-w-[250px]"
          style={{ fontSize: "20px", fontWeight: 500, padding: "0" }}
        >
          Edit Profile
        </NavLink>
      </section>

      <hr className="mt-8" style={{ borderColor: "var(--border-normal)" }} />

      {/* --- Feed Tabs --- */}
      <section className="tab-container">
        <button
          onClick={() => setActiveTab("images")}
          className={`tab-btn ${activeTab === "images" ? "active" : ""}`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
        >
          Videos
        </button>
      </section>

      {/* --- Feed Content --- */}
      <section className="w-full">
        {/* Image Feed */}
        {activeTab === "images" &&
          (images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              <div className="contents">
                <div
                  className="add-media-tile aspect-square w-full"
                  onClick={() => handleTriggerUpload("Image")}
                >
                  <Plus size={36} className="mb-2" />
                  <span className="font-medium text-sm md:text-base">
                    Add Image
                  </span>
                </div>
              </div>
              {images.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer rounded-[var(--radius-sm)]"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "something went wrong"}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ) : (
              <div
                className="empty-state-container flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]"
                onClick={() => handleTriggerUpload("Image")}
              >
                <div className="empty-circle w-24 h-24 rounded-full flex items-center justify-center mb-4">
                  <Plus size={48} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Share Images
                </h3>
                <p
                  className="max-w-sm text-sm md:text-base leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  When you share images, they will appear here. Click here to
                  add your first image.
                </p>
              </div>
          ))}

        {/* Video Feed */}
        {activeTab === "videos" &&
          (videos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              <div className="contents">
                <div
                  className="add-media-tile aspect-square w-full"
                  onClick={() => handleTriggerUpload("Video")}
                >
                  <Plus size={36} className="mb-2" />
                  <span className="font-medium text-sm md:text-base">
                    Add Video
                  </span>
                </div>
              </div>
              {videos.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer rounded-[var(--radius-sm)]"
                  onClick={() => setSelectedPost(post)}
                >
                  <video
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "something went wrong"}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    muted
                    loop
                    draggable={false}
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="empty-state-container flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]"
              onClick={() => handleTriggerUpload("Video")}
            >
              <div className="empty-circle w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <Plus size={48} />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Share Videos
              </h3>
              <p
                className="max-w-sm text-sm md:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                When you share videos, they will appear here. Click here to
                upload your first clip.
              </p>
            </div>
          ))}
      </section>

      <UploadMediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaType={mediaType}
        onSubmit={handleModalSubmit}
      />

      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </Motion.main>
    </>
  );
}