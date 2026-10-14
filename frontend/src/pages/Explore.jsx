import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  useCallback,
} from "react";
import {
  useLoaderData,
  Link,
  Await,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
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
import { trackPostImpression } from "../services/postService";
import ExploreSkeleton from "../skeletons/ExploreSkeleton";

import {
  getOptimizedMediaUrl,
  getVideoPosterUrl,
} from "../utils/cloudinaryOptimizer";
import { syncPostInteraction } from "../utils/interactionUtils";

const ExploreCard = React.memo(function ExploreCard({ post }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo =
    post.mediaType === "Video" ||
    (post.mediaUrl && post.mediaUrl.match(/\.(mp4|webm|ogg)$/i)) ||
    (post.mediaUrl && post.mediaUrl.includes("video/upload"));

  const handleMouseEnter = () => {
    if (isVideo) {
      setIsPlaying(true);
      // Wait for React to render the video element and set the ref
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const optimizedPoster = isVideo ? getVideoPosterUrl(post.mediaUrl, 400) : "";
  const optimizedImage = !isVideo
    ? getOptimizedMediaUrl(post.mediaUrl, { width: 400 })
    : "";

  return (
    <div
      className="w-full h-full min-h-55 overflow-hidden relative aspect-4/5 md:aspect-3/4 sm:min-h-70 md:min-h-87.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <div className="w-full h-full relative">
          {isPlaying ? (
            <video
              ref={videoRef}
              src={`${post.mediaUrl}#t=1.0`}
              aria-label={
                post.altText ||
                post.caption ||
                "Explore video post - LookSphere"
              }
              preload="auto"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <img
              src={optimizedPoster}
              alt={
                post.altText || post.caption || "video thumbnail - LookSphere"
              }
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
            />
          )}
          <div className="p-1.5 top-2 bg-black/50 rounded-md text-white absolute right-2 backdrop-blur-sm">
            <Video size={14} />
          </div>
        </div>
      ) : (
        <img
          src={optimizedImage}
          alt={post.altText || post.caption || "explore post - LookSphere"}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-[transform,opacity] duration-300 group-hover:scale-105"
        />
      )}

      <div className="flex-col p-4 bg-linear-to-t opacity-0 justify-end text-white absolute inset-0 from-black/80 via-black/20 to-transparent group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
        <div className="gap-2 mb-2 flex items-center">
          {post.userId ? (
            <Link
              to={`/profile/${post.userId.username}`}
              onClick={(e) => e.stopPropagation()}
              className="gap-2 flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700 justify-center shrink-0 flex items-center">
                {post.userId.profileImage ? (
                  <img
                    src={post.userId.profileImage}
                    alt={post.userId.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={12} className="text-zinc-400" />
                )}
              </div>
              <span className="font-semibold text-sm truncate drop-shadow-md">
                {post.userId.username}
              </span>
            </Link>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700 justify-center shrink-0 flex items-center">
                <User size={12} className="text-zinc-400" />
              </div>
              <span className="font-semibold text-sm truncate drop-shadow-md">
                Loading...
              </span>
            </>
          )}
        </div>

        {post.caption && (
          <p className="text-xs text-zinc-200 line-clamp-2 drop-shadow-md">
            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
});

import { fetchFeed } from "../services/postService";
import { feedRefresher } from "../utils/feedRefresher";

function ExploreContent({ posts, total }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [prevPosts, setPrevPosts] = useState(posts);
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(posts.length === 20);

  const handleInteraction = (postId, updatedData) => {
    syncPostInteraction([setSelectedPost, setAllPosts], postId, updatedData);
  };

  if (posts !== prevPosts) {
    setPrevPosts(posts);
    setAllPosts(posts);
    setPage(1);
    setHasMore(posts.length === 20);
  }

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const currentParams = new URLSearchParams(window.location.search);
      const currentSearch = currentParams.get("search") || "";
      const res = await fetchFeed(nextPage, 20, currentSearch);
      if (res.data.length < 20) setHasMore(false);
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [isClearHovered, setIsClearHovered] = useState(false);
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";
  const searchTimeoutRef = useRef(null);

  // Trigger search on query change with a slight debounce
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      const currentQuery = searchParams.get("search") || "";
      if (searchQuery.trim() !== currentQuery.trim()) {
        if (searchQuery.trim()) {
          setSearchParams({ search: searchQuery.trim() }, { replace: true });
        } else {
          setSearchParams({}, { replace: true });
        }
      }
    }, 400);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery, searchParams, setSearchParams]);

  const handlePostClick = (post) => {
    if (post._id) {
      // Optimistically update impression count locally and open modal immediately
      const updatedPost = {
        ...post,
        counts: {
          ...post.counts,
          impression: (post.counts?.impression ?? 0) + 1,
        },
      };
      setSelectedPost(updatedPost);
      setAllPosts((prev) =>
        prev.map((p) => (p._id === post._id ? updatedPost : p)),
      );

      // Passive fire-and-forget impression tracking in background
      trackPostImpression(post._id).catch(() => {});
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <>
      <div
        className="gap-3 mb-4 px-4 py-3 rounded-xl flex items-center"
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
          className="bg-transparent w-full text-sm outline-none"
          style={{ color: "var(--text-primary)" }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-0.5 rounded-full transition-colors hover:bg-(--surface-hover)"
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

      <div className="mb-8 justify-between text-sm flex items-center">
        <span style={{ color: "var(--text-muted)" }}>
          {searchQuery ? `${total} posts found` : ""}
        </span>
        <button
          onClick={() => {
            setSearchQuery("");
            revalidator.revalidate();
          }}
          disabled={isRefreshing}
          className="gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center cursor-pointer transition-all hover:bg-(--surface-hover) disabled:opacity-50"
          style={{
            backgroundColor: "var(--surface-input)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-normal)",
          }}
        >
          <div className={isRefreshing ? "animate-spin" : ""}>
            <RotateCw size={14} />
          </div>
          <span>{isRefreshing ? "Refreshing..." : "Refresh Explorer"}</span>
        </button>
      </div>

      {allPosts.length === 0 ? (
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
            No Posts Found
          </h2>
          <p
            className="mb-4 text-xs max-w-xs mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            There are no posts to explore yet. Be the first to share something!
          </p>
          <Link to="/profile" className="btn btn-primary btn-sm inline-block">
            Go to Profile
          </Link>
        </div>
      ) : searchQuery && allPosts.length === 0 ? (
        <div
          className="py-20 text-center text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No posts match &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5 md:grid-cols-4 sm:gap-1 explore-grid">
          {allPosts.map((post, index) => {
            const isTriggerElement = index === allPosts.length - 9;
            return (
              <div
                key={post._id}
                ref={isTriggerElement ? triggerElementRef : null}
                className="overflow-hidden bg-zinc-900 relative cursor-pointer group explore-card-wrapper"
                onClick={() => handlePostClick(post)}
              >
                <ExploreCard post={post} />
              </div>
            );
          })}
          <Link
            to="/profile"
            onClick={() => window.scrollTo(0, 0)}
            className="flex-col min-h-55 bg-(--surface-card) border border-dashed overflow-hidden justify-center group aspect-4/5 md:aspect-3/4 sm:min-h-70 md:min-h-87.5 cursor-pointer relative flex items-center hover:bg-(--surface-hover) transition-colors"
            style={{ borderColor: "var(--border-normal)" }}
          >
            <Plus
              size={32}
              className="mb-2"
              style={{ color: "var(--text-secondary)" }}
            />
            <span
              className="px-0.5 font-medium text-center text-xs xsm:px-0 md:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Share Your Image/Video
            </span>
          </Link>
        </div>
      )}

      {loadingMore && (
        <div className="col-span-full py-6 justify-center flex">
          <div className="rounded-full h-8 w-8 border-b-2 border-zinc-500 animate-spin"></div>
        </div>
      )}

      <PostDetailModal
        key={selectedPost?._id}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onInteraction={handleInteraction}
      />
    </>
  );
}

export default function Explore() {
  const { feedData } = useLoaderData();
  useDocumentMetadata(
    "Explore",
    "Explore trending content, viral videos, and discover new creators on LookSphere. Dive into the best of social media, brought to you by Pranav Shilu.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-0 py-4 max-w-6xl mx-auto xl:max-w-7xl md:py-8">
      <div className="mb-6 mt-6 gap-8 justify-between flex items-start">
        <div>
          <h1
            className="mb-3 text-3xl font-extrabold sm:text-4xl md:text-5xl tracking-tight"
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
        <Await
          resolve={feedData}
          errorElement={
            <div className="py-10 text-center">Error loading explore data.</div>
          }
        >
          {({ posts, total }) => <ExploreContent posts={posts} total={total} />}
        </Await>
      </Suspense>
    </div>
  );
}
