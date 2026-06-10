import { useState } from "react";
import { useLoaderData, NavLink, Form, useSubmit } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { User, Settings, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
  const submit = useSubmit();
  const { data } = useLoaderData();
  const { user, images = [], videos = [] } = data || {};

  const [activeTab, setActiveTab] = useState("images"); // "images" or "videos"

  if (!data)
    return (
      <h2 className="text-center text-muted mt-10">Loading user data...</h2>
    );

  const totalPosts = images.length + videos.length;

  return (
    <Motion.main
      className="w-full max-w-[1000px] mx-auto pt-8 pb-16 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
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
            }}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full"
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
              <span><strong className="font-semibold">{totalPosts}</strong> posts</span>
              <span><strong className="font-semibold">{user.profileViewCount || 0}</strong> profile views</span>
              <span><strong className="font-semibold">{user.totalPostViews || 0}</strong> post views</span>
            </div>

            <p
              className="whitespace-pre-wrap text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
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
        {activeTab === "images" && (
          images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              <Form method="post" encType="multipart/form-data" className="contents">
                <input type="hidden" name="type" value="Image" />
                <label className="add-media-tile">
                  <input type="file" hidden name="media" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 10 * 1024 * 1024) {
                      toast.error("Image file size cannot exceed 10 MB.");
                      e.target.value = "";
                      return;
                    }
                    submit(e.currentTarget.form);
                  }} />
                  <Plus size={36} className="mb-2" />
                  <span className="font-medium text-sm md:text-base">Add Image</span>
                </label>
              </Form>
              {images.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "something went wrong"}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Form method="post" encType="multipart/form-data" className="w-full">
              <input type="hidden" name="type" value="Image" />
              <label className="empty-state-container flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]">
                <input type="file" hidden name="media" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 10 * 1024 * 1024) {
                      toast.error("Image file size cannot exceed 10 MB.");
                      e.target.value = "";
                      return;
                    }
                    submit(e.currentTarget.form);
                  }} />
                <div className="empty-circle w-24 h-24 rounded-full flex items-center justify-center mb-4">
                  <Plus size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Share Images</h3>
                <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  When you share images, they will appear here. Click here to add your first image.
                </p>
              </label>
            </Form>
          )
        )}

        {/* Video Feed */}
        {activeTab === "videos" && (
          videos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              <Form method="post" encType="multipart/form-data" className="contents">
                <input type="hidden" name="type" value="Video" />
                <label className="add-media-tile">
                  <input type="file" hidden name="media" accept="video/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 100 * 1024 * 1024) {
                      toast.error("Video file size cannot exceed 100 MB.");
                      e.target.value = "";
                      return;
                    }
                    submit(e.currentTarget.form);
                  }} />
                  <Plus size={36} className="mb-2" />
                  <span className="font-medium text-sm md:text-base">Add Video</span>
                </label>
              </Form>
              {videos.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                >
                  <video
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "something went wrong"}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    muted
                    loop
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Form method="post" encType="multipart/form-data" className="w-full">
              <input type="hidden" name="type" value="Video" />
              <label className="empty-state-container flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]">
                <input type="file" hidden name="media" accept="video/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 100 * 1024 * 1024) {
                      toast.error("Video file size cannot exceed 100 MB.");
                      e.target.value = "";
                      return;
                    }
                    submit(e.currentTarget.form);
                  }} />
                <div className="empty-circle w-24 h-24 rounded-full flex items-center justify-center mb-4">
                  <Plus size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Share Videos</h3>
                <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  When you share videos, they will appear here. Click here to upload your first clip.
                </p>
              </label>
            </Form>
          )
        )}
      </section>
    </Motion.main>
  );
}
