import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import React from "react";
import { useLoaderData, Link, useRevalidator, Await } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import FeedSkeleton from "../skeletons/FeedSkeleton";
import {
  User,
  Clock,
  Video,
  Image as ImageIcon,
  RotateCw,
  Plus,
  Info,
  Maximize2,
  Link2,
  Check,
  Zap,
  Repeat2,
} from "lucide-react";
import BackButton from "../shared-components/BackButton";
import ScrollToTopButton from "../shared-components/ScrollToTopButton";
import PostInteractions from "../components/post/PostInteractions";
import { trackPostImpression } from "../services/postService";
import PostDetailModal from "../modals/PostDetailModal";
import { getVideoPosterUrl } from "../utils/cloudinaryOptimizer";
import DataErrorState from "../shared-components/DataErrorState";
import { applyPostInteraction } from "../utils/interactionUtils";
// Sub-component for each feed post to fetch user details asynchronously
const FeedCard = React.memo(function FeedCard({
  post,
  currentUser,
  onPostClick,
  isParentModalOpen,
  activeVideoId,
  onVideoIntersect,
  onVideoLeave,
  userInteracted,
  onInteraction,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const captionRef = useRef(null);
  const hasTrackedImpression = useRef(false);
  const isVideo = post.mediaType === "Video";
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);
  const isPlaying = isVideo && activeVideoId === post._id && !isParentModalOpen;
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

  // Track post view and notify parent about video intersection
  useEffect(() => {
    const isOwnPost =
      currentUser && post.userId && currentUser._id === post.userId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Increment impression count exactly once
          if (!isOwnPost && post._id && !hasTrackedImpression.current) {
            trackPostImpression(post._id).catch((err) => {
              console.error("[Feed] Error tracking post impression:", err);
            });
            hasTrackedImpression.current = true;
          }
          // Notify parent this video is now in view
          if (isVideo && onVideoIntersect) {
            onVideoIntersect(post._id);
          }
        } else {
          // Notify parent this video left view
          if (isVideo && onVideoLeave) {
            onVideoLeave(post._id);
          }
        }
      },
      { threshold: 0.6 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    post._id,
    currentUser,
    post.userId,
    isVideo,
    onVideoIntersect,
    onVideoLeave,
  ]);

  // Play or pause video based on active state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      const vid = videoRef.current;
      // If user has interacted, ensure unmuted
      if (userInteracted) vid.muted = false;
      vid.play().catch(() => {
        // Browser blocked unmuted autoplay — fallback to muted
        vid.muted = true;
        vid.play().catch(() => {});
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, userInteracted]);

  // Check if caption overflows 3 lines
  useEffect(() => {
    if (captionRef.current && !isCaptionExpanded) {
      const checkOverflow = () => {
        if (captionRef.current) {
          setShowViewMore(
            captionRef.current.scrollHeight > captionRef.current.clientHeight,
          );
        }
      };
      // small delay to ensure DOM layout is complete
      const timer = setTimeout(checkOverflow, 50);
      return () => clearTimeout(timer);
    }
  }, [post.caption, isCaptionExpanded]);

  return (
    <div
      ref={cardRef}
      className="flex-col rounded-2xl overflow-hidden shadow-sm flex hover:shadow-md transition-shadow"
      style={{
        backgroundColor: "var(--surface-card)",
        border: "1px solid var(--border-normal)",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Header: User Info */}
      <div
        className="p-4 justify-between border-b flex items-center"
        style={{ borderColor: "var(--border-light)" }}
      >
        {post.userId ? (
          <Link
            to={`/profile/${post.userId.username}`}
            className="gap-3 flex items-center group"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden justify-center border flex items-center transition-[transform,box-shadow] duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-zinc-600/50 group-hover:ring-offset-2 group-hover:ring-offset-zinc-950"
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
                <User
                  size={18}
                  style={{ color: "var(--text-muted)" }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
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
          <div className="gap-3 flex items-center animate-pulse">
            <div className="w-9 h-9 rounded-full bg-zinc-800" />
            <div className="h-3 w-24 bg-zinc-800 rounded" />
          </div>
        )}

        <div
          className="gap-1.5 text-xs items-center hidden sm:flex"
          style={{ color: "var(--text-muted)" }}
        >
          <Clock size={12} />
          <span>{postDate}</span>
        </div>
      </div>

      {/* Body: Media */}
      <div
        className="overflow-hidden justify-center w-full relative flex items-center"
        style={{ height: "520px", backgroundColor: "var(--bg-tertiary)" }}
      >
        {isVideo ? (
          isPlaying ? (
            <video
              ref={videoRef}
              src={post.mediaUrl}
              aria-label={
                post.altText || post.caption || "Video post - LookSphere"
              }
              poster={getVideoPosterUrl(post.mediaUrl, 600)}
              preload="metadata"
              className="w-full h-full object-contain"
              controls
              controlsList="nodownload"
              loop
              playsInline
            />
          ) : (
            <div
              className="w-full h-full justify-center relative flex items-center cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              <img
                src={getVideoPosterUrl(post.mediaUrl, 600)}
                alt={
                  post.altText || post.caption || "video thumbnail - LookSphere"
                }
                className="w-full h-full object-contain hover:opacity-95 transition-opacity"
                loading="lazy"
                decoding="async"
              />
              <div className="p-3 bg-black/50 rounded-full text-white shadow-lg absolute backdrop-blur-sm pointer-events-none">
                <Video size={24} />
              </div>
            </div>
          )
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.altText || post.caption || "post - LookSphere"}
            className="w-full h-full object-contain cursor-pointer hover:opacity-95 transition-opacity"
            loading="lazy"
            decoding="async"
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
      <div className="flex-col p-4 gap-2.5 flex">
        <PostInteractions
          key={post._id}
          post={post}
          onMaximize={() => onPostClick(post)}
          onInteraction={onInteraction}
        />

        {post.caption && (
          <div className="flex-col flex">
            <p
              ref={captionRef}
              className={`text-sm leading-relaxed whitespace-pre-wrap ${!isCaptionExpanded ? "line-clamp-3" : ""}`}
              style={{ color: "var(--text-secondary)" }}
            >
              {post.userId && (
                <strong
                  className="mr-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.userId.username}
                </strong>
              )}
              {post.caption}
            </p>
            {showViewMore && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCaptionExpanded(!isCaptionExpanded);
                }}
                className="mt-1 p-0 text-xs font-semibold bg-transparent border-none self-end hover:underline cursor-pointer"
                style={{ color: "var(--primary-500)" }}
              >
                {isCaptionExpanded ? "view less" : "view more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

// Component that renders when data is loaded
import { fetchFeed } from "../services/postService";
import { feedRefresher } from "../utils/feedRefresher";

function FeedContent({
  posts,
  currentUser,
  setSelectedPost,
  selectedPost,
  onRegisterUpdater,
  onInteraction,
}) {
  const [prevPosts, setPrevPosts] = useState(posts);
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(posts.length === 10);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [userInteracted, setUserInteracted] = useState(
    () => navigator.userActivation?.hasBeenActive ?? false,
  );

  useEffect(() => {
    if (onRegisterUpdater) {
      onRegisterUpdater((postId, updatedData) => {
        setAllPosts((prev) => applyPostInteraction(prev, postId, updatedData));
      });
    }
  }, [onRegisterUpdater]);

  // Fallback: listen for first user interaction to allow unmuted playback
  // Browser policy: on fresh page load, audio requires a user gesture (click/tap/keypress)
  useEffect(() => {
    if (userInteracted) return;
    const markInteracted = () => setUserInteracted(true);
    document.addEventListener("click", markInteracted, { once: true });
    document.addEventListener("touchstart", markInteracted, { once: true });
    document.addEventListener("keydown", markInteracted, { once: true });
    return () => {
      document.removeEventListener("click", markInteracted);
      document.removeEventListener("touchstart", markInteracted);
      document.removeEventListener("keydown", markInteracted);
    };
  }, [userInteracted]);

  const handleVideoIntersect = useCallback((postId) => {
    setActiveVideoId(postId);
  }, []);

  const handleVideoLeave = useCallback((postId) => {
    setActiveVideoId((prev) => (prev === postId ? null : prev));
  }, []);

  if (posts !== prevPosts) {
    setPrevPosts(posts);
    setAllPosts(posts);
    setPage(1);
    setHasMore(posts.length === 10);
  }

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetchFeed(nextPage, 10);
      if (res.data.length < 10) setHasMore(false);
      setAllPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newPostsRaw = res.data.filter((p) => !existingIds.has(p._id));
        const newPosts = feedRefresher(newPostsRaw);
        return [...prev, ...newPosts];
      });
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page]);

  const observer = useRef();
  const triggerElementRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, loadMore],
  );
  // Track posts seen in this session
  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      try {
        const storedSeen = sessionStorage.getItem("seenPostIds");
        const seenIds = storedSeen ? JSON.parse(storedSeen) : [];
        const currentIds = allPosts.map((p) => p._id).filter(Boolean);
        const newSeenIds = Array.from(new Set([...seenIds, ...currentIds]));
        sessionStorage.setItem("seenPostIds", JSON.stringify(newSeenIds));
      } catch (e) {
        console.error("Error writing seenPostIds:", e);
      }
    }
  }, [allPosts]);

  if (allPosts.length === 0) {
    return (
      <div
        className="py-20 text-center rounded-2xl border border-dashed"
        style={{
          borderColor: "var(--border-normal)",
          backgroundColor: "var(--surface-card)",
        }}
      >
        <div
          className="mb-3 w-12 h-12 mx-auto rounded-full justify-center flex items-center"
          style={{ backgroundColor: "var(--surface-input)" }}
        >
          <ImageIcon size={20} style={{ color: "var(--text-muted)" }} />
        </div>
        <h2
          className="mb-1 text-lg font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          No Posts
        </h2>
        <p
          className="mb-4 text-xs max-w-xs mx-auto"
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
    <div className="flex-col gap-8 flex feed-grid">
      {allPosts.map((post, index) => {
        const isTriggerElement = index === allPosts.length - 5;
        return (
          <div
            key={post._id}
            ref={isTriggerElement ? triggerElementRef : null}
            className="feed-card-wrapper"
          >
            <FeedCard
              post={post}
              currentUser={currentUser}
              onPostClick={setSelectedPost}
              isParentModalOpen={!!selectedPost}
              activeVideoId={activeVideoId}
              onVideoIntersect={handleVideoIntersect}
              onVideoLeave={handleVideoLeave}
              userInteracted={userInteracted}
              onInteraction={onInteraction}
            />
          </div>
        );
      })}

      {loadingMore && (
        <div className="py-4 justify-center flex">
          <div className="rounded-full h-8 w-8 border-b-2 border-zinc-500 animate-spin"></div>
        </div>
      )}

      {/* Add media redirect card */}
      <div>
        <Link
          to="/profile"
          onClick={() => window.scrollTo(0, 0)}
          className="flex-col py-8 justify-center rounded-2xl border border-dashed flex items-center hover:bg-(--surface-hover) transition-colors"
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
      </div>
    </div>
  );
}

export default function Feed() {
  const { feedData } = useLoaderData();
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";
  useDocumentMetadata(
    "Feed",
    "Browse your LookSphere feed for the latest updates, photos, and videos from people you follow. Enjoy a seamless social experience crafted by Pranav Shilu.",
  );

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [selectedPost, setSelectedPost] = useState(null);
  const updateFeedRef = useRef(null);

  const handleInteraction = (postId, updatedData) => {
    setSelectedPost((prev) => applyPostInteraction(prev, postId, updatedData));
    updateFeedRef.current?.(postId, updatedData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-6 px-0 py-4 max-w-xl mx-auto md:py-8">
      <div className="mb-8 justify-between flex items-start">
        <div>
          <h1
            className="mb-1 text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Community Feed
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Scroll through latest updates.
          </p>
        </div>
        <div className="flex-col gap-12 flex items-end shrink-0">
          <BackButton />
          <button
            onClick={() => revalidator.revalidate()}
            disabled={isRefreshing}
            className="p-2 justify-center rounded-lg flex items-center cursor-pointer transition-all hover:bg-(--surface-hover) disabled:opacity-50"
            style={{
              backgroundColor: "var(--surface-input)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-normal)",
            }}
            title="Refresh Feed"
          >
            <div
              className={`flex items-center justify-center ${isRefreshing ? "animate-spin" : ""}`}
            >
              <RotateCw size={16} />
            </div>
          </button>
        </div>
      </div>

      <Suspense fallback={<FeedSkeleton />}>
        <Await
          resolve={feedData}
          errorElement={
            <DataErrorState
              skeleton={FeedSkeleton}
              message="Failed to load your feed. Check your connection or try again."
              onRetry={() => revalidator.revalidate()}
            />
          }
        >
          {({ posts }) => (
            <FeedContent
              posts={posts}
              currentUser={currentUser}
              setSelectedPost={setSelectedPost}
              selectedPost={selectedPost}
              onRegisterUpdater={(fn) => {
                updateFeedRef.current = fn;
              }}
              onInteraction={handleInteraction}
            />
          )}
        </Await>
      </Suspense>

      <ScrollToTopButton />
      <PostDetailModal
        key={selectedPost?._id}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onInteraction={handleInteraction}
      />
    </div>
  );
}
