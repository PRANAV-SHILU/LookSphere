import { useState, useEffect } from "react";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Video, Image as ImageIcon, Plus, RotateCw, Search, X } from "lucide-react";
import BackButton from "../shared-components/BackButton";
import PostDetailModal from "../modals/PostDetailModal";
import { trackPostView } from "../services/postService";
import { STOPWORDS } from "../utils/constants";

export default function Explore() {
  const posts = useLoaderData();
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const filteredPosts = (() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return posts;

    let queryWords = query.split(/[\s\r\n]+/).filter(Boolean);
    if (queryWords.length === 0) return posts;

    // Filter out stopwords unless query contains only stopwords
    const nonStopwords = queryWords.filter((word) => !STOPWORDS.has(word));
    if (nonStopwords.length > 0) {
      queryWords = nonStopwords;
    }

    const scoredPosts = [];

    posts.forEach((post) => {
      const caption = (post.caption || "").toLowerCase();
      const altText = (post.altText || "").toLowerCase();

      let score = 0;

      // 1. Check for entire query matching caption/alttext (gives heavy priority boost)
      const isExactMatch = caption.includes(query) || altText.includes(query);
      if (isExactMatch) {
        score += 1000;
      }

      // 2. Count how many individual words match
      let matchedWords = 0;
      queryWords.forEach((word) => {
        if (caption.includes(word) || altText.includes(word)) {
          matchedWords++;
        }
      });

      if (matchedWords > 0) {
        score += matchedWords;
        scoredPosts.push({ post, score });
      }
    });

    // Sort descending by score to put the most relevant matches first
    scoredPosts.sort((a, b) => b.score - a.score);

    return scoredPosts.map((item) => item.post);
  })();

  // Track posts that have been rendered in this session
  useEffect(() => {
    if (posts && posts.length > 0) {
      try {
        const storedSeen = sessionStorage.getItem("seenPostIds");
        const seenIds = storedSeen ? JSON.parse(storedSeen) : [];
        const currentIds = posts.map((p) => p._id).filter(Boolean);
        const newSeenIds = Array.from(new Set([...seenIds, ...currentIds]));
        sessionStorage.setItem("seenPostIds", JSON.stringify(newSeenIds));
      } catch (e) {
        console.error("Error writing seenPostIds to sessionStorage:", e);
      }
    }
  }, [posts]);

  const handlePostClick = async (post) => {
    const isOwnPost = currentUser && post.userId && currentUser._id === post.userId;
    if (!isOwnPost && post._id) {
      const updatedPost = await trackPostView(post._id).catch(() => {});
      setSelectedPost(updatedPost || post);
    } else {
      setSelectedPost(post);
    }
  };

  const postsHash = posts.map((p) => p._id).join(",");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.94,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Motion.div
      className="max-w-6xl mx-auto p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Explore Community
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Explore latest photos and videos shared by the community.
          </p>
        </div>
        <BackButton />
      </div>

      {/* --- Search Bar --- */}
      <div
        className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
        style={{
          backgroundColor: "var(--surface-input)",
          border: "1px solid var(--border-normal)",
        }}
      >
        <Search size={18} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search by caption or alt text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none w-full text-sm"
          style={{ color: "var(--text-primary)" }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-0.5 rounded-full hover:bg-zinc-800/80"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* --- Refresh Button --- */}
      <div className="mb-6 flex justify-end">
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
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isRefreshing
                ? { repeat: Infinity, duration: 1, ease: "linear" }
                : { duration: 0.2, ease: "easeOut" }
            }
          >
            <RotateCw size={14} />
          </Motion.div>
          <span>{isRefreshing ? "Refreshing..." : "Refresh Explorer"}</span>
        </button>
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
      ) : filteredPosts.length === 0 ? (
        <div
          className="text-center py-20 text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No posts match &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <Motion.div
          key={`${postsHash}-${searchQuery}`}
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              const isVideo = post.mediaType === "Video";

              return (
                <Motion.div
                  layout
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
          </AnimatePresence>
          
          {/* Add media redirect tile */}
          <Motion.div
            layout
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
