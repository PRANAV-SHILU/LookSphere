import { useState, useEffect, useRef, Suspense } from "react";
import { useLoaderData, Link, useRevalidator, Await } from "react-router-dom";
import FeedSkeleton from "../skeletons/FeedSkeleton";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  User,
  Eye,
  Clock,
  Video,
  Image as ImageIcon,
  RotateCw,
  Plus,
  Info,
  ArrowUp,
  Maximize2,
} from "lucide-react";
import BackButton from "../shared-components/BackButton";
import { trackPostView } from "../services/postService";
import { Feed as FeedAnimation } from "../utils/animation";
import PostDetailModal from "../modals/PostDetailModal";

// Sub-component for each feed post to fetch user details asynchronously
function FeedCard({ post, currentUser, onPostClick, isParentModalOpen }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hasTrackedView = useRef(false);
  const isVideo = post.mediaType === "Video";
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isMaximizeHovered, setIsMaximizeHovered] = useState(false);
  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  // Track post view once
  useEffect(() => {
    const isOwnPost =
      currentUser && post.userId && currentUser._id === post.userId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Increment view count exactly once
          if (!isOwnPost && post._id && !hasTrackedView.current) {
            trackPostView(post._id).catch(() => {});
            hasTrackedView.current = true;
          }
        }
      },
      { threshold: 0.5 }, // Triggers when 50% of the post card enters/leaves viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [post._id, currentUser, post.userId]);

  // Control video play/pause based on intersection and modal state
  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isIntersecting && !isParentModalOpen) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isIntersecting, isParentModalOpen, isVideo]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{
        backgroundColor: "var(--surface-card)",
        border: "1px solid var(--border-normal)",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Header: User Info */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--border-light)" }}
      >
        {post.userId ? (
          <Link
            to={`/profile/${post.userId.username}`}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-zinc-600/50 group-hover:ring-offset-2 group-hover:ring-offset-zinc-950"
              style={{
                backgroundColor: "var(--surface-input)",
                borderColor: "var(--border-normal)",
              }}
            >
              {post.userId.profileImage ? (
                <img
                  src={post.userId.profileImage}
                  alt={post.userId.username}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <User size={18} style={{ color: "var(--text-muted)" }} className="transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
            <span
              className="font-bold text-sm transition-opacity duration-300 group-hover:opacity-80 group-hover:underline underline-offset-2"
              style={{ color: "var(--text-primary)" }}
            >
              {post.userId.username}
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-zinc-800" />
            <div className="h-3 w-24 bg-zinc-800 rounded" />
          </div>
        )}

        <div
          className="items-center gap-1.5 text-xs hidden sm:flex"
          style={{ color: "var(--text-muted)" }}
        >
          <Clock size={12} />
          <span>{postDate}</span>
        </div>
      </div>

      {/* Body: Media */}
      <div className="relative bg-zinc-950 overflow-hidden flex items-center justify-center w-full">
        {isVideo ? (
          <video
            ref={videoRef}
            src={post.mediaUrl}
            className="w-full h-auto max-h-[600px] object-contain"
            controls
            controlsList="nodownload"
            loop
            playsInline
          />
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.altText || post.caption || "post"}
            className="w-full h-auto max-h-[600px] object-contain cursor-pointer hover:opacity-95 transition-opacity"
            loading="lazy"
            onClick={() => onPostClick(post)}
          />
        )}

        {post.altText && (
          <div className="post-detail-alt-trigger">
            <Info size={16} />
            <div className="post-detail-alt-tooltip">{post.altText}</div>
          </div>
        )}
      </div>

      {/* Footer: Details */}
      <div className="p-4 flex flex-col gap-2.5">
        <div
          className="flex items-center justify-between text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="font-medium flex items-center gap-1">
            <Eye size={13} />
            {post.postViewCount || 0} views
          </span>
          <button
            type="button"
            onClick={() => onPostClick(post)}
            className="flex items-center justify-center p-1.5 rounded-lg hover:bg-zinc-800/80 transition-all cursor-pointer border-none bg-transparent"
            style={{
              color: isMaximizeHovered
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
            onMouseEnter={() => setIsMaximizeHovered(true)}
            onMouseLeave={() => setIsMaximizeHovered(false)}
            title="View in full screen"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {post.caption ? (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.userId && (
              <strong className="mr-2" style={{ color: "var(--text-primary)" }}>
                {post.userId.username}
              </strong>
            )}
            {post.caption}
          </p>
        ) : (
          <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
            No caption.
          </p>
        )}
      </div>
    </div>
  );
}

// Component that renders when data is loaded
function FeedContent({ posts, currentUser, setSelectedPost, selectedPost }) {
  // Track posts seen in this session
  useEffect(() => {
    if (posts && posts.length > 0) {
      try {
        const storedSeen = sessionStorage.getItem("seenPostIds");
        const seenIds = storedSeen ? JSON.parse(storedSeen) : [];
        const currentIds = posts.map((p) => p._id).filter(Boolean);
        const newSeenIds = Array.from(new Set([...seenIds, ...currentIds]));
        sessionStorage.setItem("seenPostIds", JSON.stringify(newSeenIds));
      } catch (e) {
        console.error("Error writing seenPostIds:", e);
      }
    }
  }, [posts]);

  const postsHash = posts.map((p) => p._id).join(",");

  if (posts.length === 0) {
    return (
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
          No Posts
        </h2>
        <p
          className="text-xs max-w-xs mx-auto mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Be the first to share an image or video!
        </p>
        <Link to="/profile" className="btn btn-primary btn-sm inline-block">
          Go to Profile
        </Link>
      </div>
    );
  }

  return (
    <Motion.div
      key={postsHash}
      layout
      className="flex flex-col gap-8"
      variants={FeedAnimation.containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <Motion.div
            key={post._id}
            layout
            variants={FeedAnimation.cardVariants}
          >
            <FeedCard
              post={post}
              currentUser={currentUser}
              onPostClick={setSelectedPost}
              isParentModalOpen={!!selectedPost}
            />
          </Motion.div>
        ))}
      </AnimatePresence>

      {/* Add media redirect card */}
      <Motion.div layout>
        <Link
          to="/profile"
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center justify-center py-8 rounded-2xl border border-dashed hover:bg-zinc-800/40 transition-colors"
          style={{
            borderColor: "var(--border-normal)",
            backgroundColor: "var(--surface-card)",
            maxWidth: "520px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Plus
            size={24}
            className="mb-1"
            style={{ color: "var(--text-secondary)" }}
          />
          <span
            className="font-semibold text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Share Your Own Image or Video
          </span>
        </Link>
      </Motion.div>
    </Motion.div>
  );
}

export default function Feed() {
  const { feedData } = useLoaderData();
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Motion.div
      className="max-w-xl mx-auto  mt-6 p-4 md:py-8"
      {...FeedAnimation.pageTransition}
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-extrabold mb-1 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Community Feed
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Scroll through latest updates.
          </p>
        </div>
        <div className="flex flex-col items-end gap-12 shrink-0">
          <BackButton />
          <button
            onClick={() => revalidator.revalidate()}
            disabled={isRefreshing}
            className="flex items-center justify-center p-2 rounded-lg transition-all hover:bg-zinc-800 disabled:opacity-50"
            style={{
              backgroundColor: "var(--surface-input)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-normal)",
            }}
            title="Refresh Feed"
          >
            <Motion.div
              animate={
                isRefreshing
                  ? FeedAnimation.spinnerActive
                  : FeedAnimation.spinnerInactive
              }
              transition={
                isRefreshing
                  ? FeedAnimation.spinnerTransitionActive
                  : FeedAnimation.spinnerTransitionInactive
              }
              className="flex items-center justify-center"
            >
              <RotateCw size={16} />
            </Motion.div>
          </button>
        </div>
      </div>

      <Suspense fallback={<FeedSkeleton />}>
        <Await resolve={feedData} errorElement={<div className="text-center py-10">Error loading feed.</div>}>
          {(posts) => (
            <FeedContent 
              posts={posts} 
              currentUser={currentUser} 
              setSelectedPost={setSelectedPost} 
              selectedPost={selectedPost} 
            />
          )}
        </Await>
      </Suspense>

      <AnimatePresence>
        {showScrollTop && (
          <Motion.button
            onClick={scrollToTop}
            className="flex opacity-50 items-center justify-center cursor-pointer"
            {...FeedAnimation.scrollTopButton}
            style={{
              position: "fixed",
              bottom: "2.5rem",
              right: "2.5rem",
              zIndex: 100,
              backgroundColor: "var(--primary-500)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              boxShadow: "var(--shadow-card)",
            }}
            title="Scroll to Top"
          >
            <ArrowUp size={20} />
          </Motion.button>
        )}
      </AnimatePresence>
      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </Motion.div>
  );
}
