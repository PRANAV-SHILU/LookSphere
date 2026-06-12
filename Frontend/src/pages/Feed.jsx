import { useState, useEffect } from "react";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { User, Eye, MessageSquare, Clock, Video, Image as ImageIcon, Plus, RotateCw } from "lucide-react";
import BackButton from "../shared-components/BackButton";
import PostDetailModal from "../utils/PostDetailModal";
import { trackPostView } from "../services/postService";

export default function Feed() {
  const posts = useLoaderData();
  const [selectedPost, setSelectedPost] = useState(null);
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  // Track posts that have been rendered in this session
  useEffect(() => {
    if (posts && posts.length > 0) {
      try {
        const storedSeen = sessionStorage.getItem("seenPostIds");
        const seenIds = storedSeen ? JSON.parse(storedSeen) : [];
        // Only store IDs that actually represent real posts
        const currentIds = posts.map((p) => p._id).filter(Boolean);
        const newSeenIds = Array.from(new Set([...seenIds, ...currentIds]));
        sessionStorage.setItem("seenPostIds", JSON.stringify(newSeenIds));
      } catch (e) {
        console.error("Error writing seenPostIds to sessionStorage:", e);
      }
    }
  }, [posts]);

  const handlePostClick = async (post) => {
    // Only track view if viewer is not the author
    const isOwnPost = currentUser && post.userId && currentUser._id === post.userId;
    if (!isOwnPost && post._id) {
      const updatedPost = await trackPostView(post._id).catch(() => {});
      setSelectedPost(updatedPost || post);
    } else {
      setSelectedPost(post);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  return (
    <Motion.div
      className="max-w-6xl mx-auto p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Community Feed
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Explore latest photos and videos shared by the community.
          </p>
        </div>
        <div className="flex flex-col items-end gap-20 shrink-0">
          <BackButton />
          <button
            onClick={() => revalidator.revalidate()}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-zinc-800 disabled:opacity-50"
            style={{
              backgroundColor: "var(--surface-input)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-normal)",
            }}
          >
            <Motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RotateCw size={14} />
            </Motion.div>
            <span>{isRefreshing ? "Refreshing..." : "Refresh Feed"}</span>
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div
          className="text-center py-24 rounded-2xl border border-dashed"
          style={{
            borderColor: "var(--border-normal)",
            backgroundColor: "var(--surface-card)",
          }}
        >
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "var(--surface-input)" }}>
            <ImageIcon size={28} style={{ color: "var(--text-muted)" }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>No Posts Yet</h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
            Be the first to share an image or video! Go to your profile to upload.
          </p>
          <Link to="/profile" className="btn btn-primary mt-6 inline-block">
            Go to Profile
          </Link>
        </div>
      ) : (
        <Motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map((post) => {
            const isVideo = post.mediaType === "Video";

            return (
              <Motion.div
                key={post._id}
                variants={itemVariants}
                className="group aspect-square bg-zinc-900 overflow-hidden cursor-pointer rounded-xl relative flex items-center justify-center"
                onClick={() => handlePostClick(post)}
              >
                {isVideo ? (
                  <>
                    <video
                      src={post.mediaUrl}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => e.target.play()}
                      onMouseOut={(e) => e.target.pause()}
                    />
                    <div className="absolute top-3 right-3 bg-black/60 p-1.5 rounded-full text-white pointer-events-none">
                      <Video size={16} />
                    </div>
                  </>
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt={post.altText || post.caption || "post"}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </Motion.div>
            );
          })}
          
          {/* Add media redirect tile */}
          <Motion.div
            variants={itemVariants}
            className="contents"
          >
            <Link
              to="/profile"
              onClick={() => window.scrollTo(0, 0)}
              className="group aspect-square bg-zinc-900 border border-dashed border-[var(--border-normal)] overflow-hidden cursor-pointer rounded-xl relative flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <Plus size={32} className="mb-2 text-[var(--text-secondary)]" />
              <span className="font-medium text-xs md:text-sm text-[var(--text-secondary)]">
                Share Your Image/Video
              </span>
            </Link>
          </Motion.div>
        </Motion.div>
      )}

      {/* Detail Modal */}
      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </Motion.div>
  );
}
