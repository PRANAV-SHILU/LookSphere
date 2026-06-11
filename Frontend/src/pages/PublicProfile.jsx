import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { User, Image, Video } from "lucide-react";
import BackButton from "../shared-components/BackButton";

export default function PublicProfile() {
  const { data } = useLoaderData();
  const { user, images = [], videos = [] } = data || {};

  const [activeTab, setActiveTab] = useState("images");

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
              {images.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "image"}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <Image size={48} style={{ color: "var(--text-muted)" }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                No Images Yet
              </h3>
              <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {user.username} hasn't uploaded any images yet.
              </p>
            </div>
          )
        )}

        {/* Video Feed */}
        {activeTab === "videos" && (
          videos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
              {videos.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                >
                  <video
                    src={post.mediaUrl}
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
            <div className="flex flex-col items-center justify-center py-16 text-center mx-auto w-[70%]">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <Video size={48} style={{ color: "var(--text-muted)" }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                No Videos Yet
              </h3>
              <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {user.username} hasn't uploaded any videos yet.
              </p>
            </div>
          )
        )}
      </section>
    </Motion.main>
  );
}
