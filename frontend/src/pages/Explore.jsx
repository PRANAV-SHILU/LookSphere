import { useState, useEffect, useRef, Suspense } from "react";
import { useLoaderData, Link, Await, useRevalidator } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Image as ImageIcon,
  Plus,
  RotateCw,
  Search,
  X,
  User,
} from "lucide-react";
import BackButton from "../shared-components/BackButton";
import PostDetailModal from "../modals/PostDetailModal";
import { trackPostView } from "../services/postService";
import { fetchUserDetail } from "../services/userService";
import { STOPWORDS } from "../utils/constants";
import { Explore as ExploreAnimation } from "../utils/animation";
import ExploreSkeleton from "../skeletons/ExploreSkeleton";

function ExploreCard({ post }) {
  const [author, setAuthor] = useState(null);
  const videoRef = useRef(null);
  const isVideo =
    post.mediaType === "Video" ||
    (post.mediaUrl && post.mediaUrl.match(/\.(mp4|webm|ogg)$/i)) ||
    (post.mediaUrl && post.mediaUrl.includes("video/upload"));

  useEffect(() => {
    if (post.userId) {
      fetchUserDetail(post.userId)
        .then((data) => setAuthor(data))
        .catch((err) => console.error("Error loading post author:", err));
    }
  }, [post.userId]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={post.mediaUrl}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            muted
            loop
            playsInline
          />
          <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-md text-white backdrop-blur-sm">
            <Video size={14} />
          </div>
        </div>
      ) : (
        <img
          src={post.mediaUrl}
          alt={post.altText || post.caption || "explore post"}
          loading="lazy"
          className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          {author ? (
            <Link
              to={`/profile/${author.username}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700 shrink-0 flex items-center justify-center">
                {author.profileImage ? (
                  <img
                    src={author.profileImage}
                    alt="author"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={12} className="text-zinc-400" />
                )}
              </div>
              <span className="font-semibold text-sm truncate drop-shadow-md">
                {author.username}
              </span>
            </Link>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700 shrink-0 flex items-center justify-center">
                <User size={12} className="text-zinc-400" />
              </div>
              <span className="font-semibold text-sm truncate drop-shadow-md">
                Loading...
              </span>
            </>
          )}
        </div>

        {post.caption && (
          <p className="text-xs line-clamp-2 text-zinc-200 drop-shadow-md">
            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
}

function ExploreContent({ posts, setSelectedPost }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isClearHovered, setIsClearHovered] = useState(false);
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";

  const filteredPosts = (() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return posts;

    let queryWords = query.split(/[\s\r\n]+/).filter(Boolean);
    if (queryWords.length === 0) return posts;

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

      score += matchedWords * 10;

      if (score > 0) {
        scoredPosts.push({ post, score });
      }
    });

    // Sort descending by score to put the most relevant matches first
    scoredPosts.sort((a, b) => b.score - a.score);

    return scoredPosts.map((sp) => sp.post);
  })();

  const handlePostClick = async (post) => {
    if (post._id) {
      const updatedPost = await trackPostView(post._id).catch(() => {});
      setSelectedPost(updatedPost || post);
    } else {
      setSelectedPost(post);
    }
  };

  const postsHash = posts.map((p) => p._id).join(",");

  return (
    <>
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
            className="transition-colors p-0.5 rounded-full hover:bg-zinc-800/80"
            style={{
              color: isClearHovered
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
            onMouseEnter={() => setIsClearHovered(true)}
            onMouseLeave={() => setIsClearHovered(false)}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mb-8 flex justify-between items-center text-sm">
        <span style={{ color: "var(--text-muted)" }}>
          {filteredPosts.length} posts found
        </span>
        <button
          onClick={() => revalidator.revalidate()}
          disabled={isRefreshing}
          className="flex items-center cursor-pointer gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-zinc-800 disabled:opacity-50"
          style={{
            backgroundColor: "var(--surface-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-normal)",
          }}
        >
          <Motion.div
            animate={
              isRefreshing
                ? ExploreAnimation.spinnerActive
                : ExploreAnimation.spinnerInactive
            }
            transition={
              isRefreshing
                ? ExploreAnimation.spinnerTransitionActive
                : ExploreAnimation.spinnerTransitionInactive
            }
          >
            <RotateCw size={14} />
          </Motion.div>
          <span>{isRefreshing ? "Refreshing..." : "Refresh Explorer"}</span>
        </button>
      </div>

      {posts.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl border border-dashed"
          style={{
            borderColor: "var(--border-normal)",
            backgroundColor: "var(--surface-card)",
          }}
        >
          <div
            className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: "var(--surface-input)" }}
          >
            <ImageIcon size={20} style={{ color: "var(--text-muted)" }} />
          </div>
          <h2
            className="text-lg font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            No Posts Found
          </h2>
          <p
            className="text-xs max-w-xs mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            There are no posts to explore yet. Be the first to share something!
          </p>
          <Link to="/profile" className="btn btn-primary btn-sm inline-block">
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
          key={postsHash}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          variants={ExploreAnimation.containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => {
              return (
                <Motion.div
                  key={post._id}
                  variants={ExploreAnimation.itemVariants}
                  className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group bg-zinc-900 border"
                  style={{ borderColor: "var(--border-normal)" }}
                  onClick={() => handlePostClick(post)}
                >
                  <ExploreCard post={post} />
                </Motion.div>
              );
            })}
          </AnimatePresence>
              <Link
                to="/profile"
                onClick={() => window.scrollTo(0, 0)}
                className="group aspect-square bg-zinc-900 border border-dashed overflow-hidden cursor-pointer rounded-xl relative flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors"
                style={{ borderColor: "var(--border-normal)" }}
              >
                <Plus
                  size={32}
                  className="mb-2"
                  style={{ color: "var(--text-secondary)" }}
                />
                <span
                  className="font-medium px-0.5 xsm:px-0 text-center text-xs md:text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Share Your Image/Video
                </span>
              </Link>
          </Motion.div>
        )}
  
      </>
    );
  }
  
  export default function Explore() {
    const { feedData } = useLoaderData();
    const [selectedPost, setSelectedPost] = useState(null);
  
    return (
      <Motion.div
        className="max-w-6xl xl:max-w-7xl mx-auto p-4 md:p-8"
        {...ExploreAnimation.pageTransition}
      >
        <div className="mb-6 mt-6 gap-8 flex items-start justify-between">
          <div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Explore Community
            </h1>
            <p
              className="text-base sm:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              Explore latest photos and videos shared by the community.
            </p>
          </div>
          <BackButton />
        </div>
  
        <Suspense fallback={<ExploreSkeleton />}>
          <Await resolve={feedData} errorElement={<div className="text-center py-10">Error loading explore data.</div>}>
            {(posts) => (
              <ExploreContent 
                posts={posts} 
                setSelectedPost={setSelectedPost} 
              />
            )}
          </Await>
        </Suspense>
  
        <PostDetailModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      </Motion.div>
    );
  }
