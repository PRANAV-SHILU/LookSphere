import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, User } from "lucide-react";
import PostDetailModal from "../../modals/PostDetailModal";
import { trackPostView } from "../../services/postService";

function formatTimeAgo(dateString, now) {
  if (!dateString) return "";
  const diff = now - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function LatestPostsTab({ latestPosts: initialPosts, now }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredPostUser, setHoveredPostUser] = useState(null);

  const handlePostClick = async (post) => {
    setSelectedPost({
      ...post,
      userId: post.userId && typeof post.userId === "object" ? post.userId._id : post.userId
    });

    if (post._id) {
      try {
        await trackPostView(post._id);
        // Increment the view count in local state so the UI updates instantly
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === post._id
              ? { ...p, postViewCount: (p.postViewCount || 0) + 1 }
              : p
          )
        );
      } catch (err) {
        console.error("Failed to track post view:", err);
      }
    }
  };

  return (
    <div
      className="rounded-2xl p-6 md:p-8 overflow-hidden shadow-lg border"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-normal)",
      }}
    >
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        Latest Posts — Last 7 Days
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        {posts.length} post{posts.length !== 1 ? "s" : ""} published recently
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-lg font-medium" style={{ color: "var(--text-muted)" }}>
          No posts in the last 7 days.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              onClick={() => handlePostClick(post)}
              style={{
                backgroundColor: "var(--surface-input)",
                border: "1px solid var(--border-light)",
              }}
            >
              {/* Media preview */}
              <div className="relative aspect-square bg-black/10 overflow-hidden">
                {post.mediaType === "Video" ? (
                  <video
                     src={post.mediaUrl}
                     className="w-full h-full object-cover"
                     muted
                     loop
                     autoPlay
                   />
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt={post.altText || "Post media"}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Media type badge */}
                <div
                  className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: post.mediaType === "Video" ? "rgba(245,158,11,0.9)" : "rgba(16,185,129,0.9)",
                    color: "#fff",
                  }}
                >
                  {post.mediaType}
                </div>
              </div>

              {/* Post info */}
              <div className="p-3">
                {/* Author */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--surface-card)" }}
                  >
                    {post.userId?.profileImage ? (
                      <img src={post.userId.profileImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User size={12} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                  <span
                    className="text-xs font-bold truncate cursor-pointer transition-colors"
                    style={{ color: hoveredPostUser === post._id ? "var(--primary-500)" : "var(--text-primary)" }}
                    onMouseEnter={() => setHoveredPostUser(post._id)}
                    onMouseLeave={() => setHoveredPostUser(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (post.userId?.username) navigate(`/profile/${post.userId.username}`);
                    }}
                  >
                    {post.userId?.username || "Unknown"}
                  </span>
                </div>

                {/* Caption */}
                {post.caption && (
                  <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--text-secondary)" }}>
                    {post.caption}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Eye size={12} />
                    {post.postViewCount || 0}
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatTimeAgo(post.createdAt, now)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPost && (
        <PostDetailModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </div>
  );
}

