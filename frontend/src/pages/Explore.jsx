import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { useLoaderData, Link, Await, useRevalidator } from "react-router-dom";
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
import { trackPostView } from "../services/postService";
import ExploreSkeleton from "../skeletons/ExploreSkeleton";

const ExploreCard = React.memo(function ExploreCard({ post }) {
  const videoRef = useRef(null);
  const isVideo =
    post.mediaType === "Video" ||
    (post.mediaUrl && post.mediaUrl.match(/\.(mp4|webm|ogg)$/i)) ||
    (post.mediaUrl && post.mediaUrl.includes("video/upload"));

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
      className="relative w-full h-full aspect-4/5 md:aspect-3/4 min-h-[220px] sm:min-h-[280px] md:min-h-[350px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={`${post.mediaUrl}#t=1.0`}
            preload="metadata"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
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
          decoding="async"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-[transform,opacity] duration-300 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          {post.userId ? (
            <Link
              to={`/profile/${post.userId.username}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700 shrink-0 flex items-center justify-center">
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
});

import { fetchFeed } from "../services/postService";
import { feedRefresher } from "../utils/feedRefresher";

function ExploreContent({ posts, setSelectedPost }) {
  const [prevPosts, setPrevPosts] = useState(posts);
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(posts.length === 20);

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
      const res = await fetchFeed(nextPage, 20);
      if (res.data.length < 20) setHasMore(false);
      setAllPosts(prev => {
        const existingIds = new Set(prev.map(p => p._id));
        const newPostsRaw = res.data.filter(p => !existingIds.has(p._id));
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
  const triggerElementRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore, loadMore]);
  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });
  const [isClearHovered, setIsClearHovered] = useState(false);
  const revalidator = useRevalidator();
  const isRefreshing = revalidator.state === "loading";
  const searchTimeoutRef = useRef(null);

  // Trigger search on query change with a slight debounce
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    searchTimeoutRef.current = setTimeout(() => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentQuery = currentParams.get("search") || "";
      if (searchQuery.trim() !== currentQuery.trim()) {
        const newParams = new URLSearchParams(window.location.search);
        if (searchQuery.trim()) {
          newParams.set("search", searchQuery.trim());
        } else {
          newParams.delete("search");
        }
        // Use history.replaceState to avoid adding unnecessary entries to the history stack,
        // and trigger revalidation to reload loader data
        window.history.replaceState({}, "", `${window.location.pathname}?${newParams.toString()}`);
        revalidator.revalidate();
      }
    }, 400);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery, revalidator]);

  const handlePostClick = async (post) => {
    if (post._id) {
      const updatedPost = await trackPostView(post._id).catch(() => {});
      if (updatedPost) {
        setSelectedPost({
          ...post,
          postViewCount: updatedPost.postViewCount
        });
      } else {
        setSelectedPost(post);
      }
    } else {
      setSelectedPost(post);
    }
  };

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
          {allPosts.length} posts found
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
          <div
            className={isRefreshing ? "animate-spin" : ""}
          >
            <RotateCw size={14} />
          </div>
          <span>{isRefreshing ? "Refreshing..." : "Refresh Explorer"}</span>
        </button>
      </div>

      {allPosts.length === 0 ? (
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
      ) : searchQuery && allPosts.length === 0 ? (
        <div
          className="text-center py-20 text-lg font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          No posts match &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div
          className="grid grid-cols-3 md:grid-cols-4 gap-[2px] sm:gap-[4px] explore-grid"
        >
            {allPosts.map((post, index) => {
                const isTriggerElement = index === allPosts.length - 9;
                return (
                  <div
                    key={post._id}
                    ref={isTriggerElement ? triggerElementRef : null}
                    className="relative overflow-hidden cursor-pointer group bg-zinc-900 explore-card-wrapper"
                    onClick={() => handlePostClick(post)}
                  >
                    <ExploreCard post={post} />
                  </div>
                );
            })}
              <Link
                to="/profile"
                onClick={() => window.scrollTo(0, 0)}
                className="group aspect-4/5 md:aspect-3/4 min-h-[220px] sm:min-h-[280px] md:min-h-[350px] bg-zinc-900 border border-dashed overflow-hidden cursor-pointer relative flex flex-col items-center justify-center hover:bg-zinc-800 transition-colors"
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
          </div>
        )}

      {loadingMore && (
        <div className="flex justify-center py-6 col-span-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
        </div>
      )}
  
      </>
    );
  }
  
  export default function Explore() {
    const { feedData } = useLoaderData();
    const [selectedPost, setSelectedPost] = useState(null);
    useDocumentMetadata("Explore");

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div
        className="max-w-6xl xl:max-w-7xl mx-auto px-0 py-4 md:py-8"
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
      </div>
    );
  }
