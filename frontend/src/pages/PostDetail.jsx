import { useState, useRef, useEffect, Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import {
  User,
  Clock,
  Eye,
  Link2,
  Check,
  Video,
  Info,
  Maximize2,
} from "lucide-react";
import PageLoader from "../shared-components/PageLoader";
import BackButton from "../shared-components/BackButton";
import { getVideoPosterUrl } from "../utils/cloudinaryOptimizer";
import PostDetailModal from "../modals/PostDetailModal";
import { trackPostView } from "../services/postService";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function PostDetail() {
  const { post } = useLoaderData();

  return (
    <div className="max-w-xl mx-auto mt-6 px-0 py-4 md:py-8 pb-24 md:pb-8 relative flex flex-col gap-6 min-h-screen">
      <div className="flex items-center justify-between">
        <BackButton />
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <PageLoader />
          </div>
        }
      >
        <Await resolve={post}>
          {(resolvedPost) => <PostCard post={resolvedPost} />}
        </Await>
      </Suspense>
    </div>
  );
}

function PostCard({ post }) {
  const authorUsername =
    typeof post?.userId === "object" && post?.userId?.username
      ? post.userId.username
      : "";

  const postDescription = post?.caption
    ? `${post.caption}${post.altText ? ` (Alt: ${post.altText})` : ""} - Post by @${authorUsername || "user"} on LookSphere.`
    : post?.altText
      ? `${post.altText} - Post by @${authorUsername || "user"} on LookSphere.`
      : `View post by @${authorUsername || "user"} on LookSphere.`;

  useDocumentMetadata(
    authorUsername ? `Post by @${authorUsername}` : "Post",
    postDescription,
  );

  // Inject JSON-LD structured data for the post
  useEffect(() => {
    if (!post?._id) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `json-ld-post-${post._id}`;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SocialMediaPosting",
      headline: post.caption || post.altText || "Post on LookSphere",
      articleBody: post.caption
        ? post.altText
          ? `${post.caption} (Alt: ${post.altText})`
          : post.caption
        : post.altText || "",
      description: post.altText || post.caption || "",
      author: {
        "@type": "Person",
        name: authorUsername || "Unknown",
      },
      image: post.mediaType === "Image" ? post.mediaUrl : undefined,
      datePublished: post.createdAt,
      url: `https://looksphere.vercel.app/posts/${post._id}`,
    };

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [post, authorUsername]);

  const videoRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isMaximizeHovered, setIsMaximizeHovered] = useState(false);
  const [viewCount, setViewCount] = useState(post?.postViewCount || 0);
  const hasTrackedView = useRef(false);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const postAuthorId = post?.userId?._id || post?.userId;
  const isOwnPost =
    currentUser &&
    postAuthorId &&
    (currentUser._id === postAuthorId || currentUser.id === postAuthorId);

  // Increment view count when opening post via URL (if not own post)
  useEffect(() => {
    if (!post?._id || hasTrackedView.current || isOwnPost) return;

    hasTrackedView.current = true;
    trackPostView(post._id)
      .then((updated) => {
        if (updated?.postViewCount != null) {
          setViewCount(updated.postViewCount);
        } else {
          setViewCount((prev) => prev + 1);
        }
      })
      .catch(() => {});
  }, [post?._id, isOwnPost]);

  const isVideo = post.mediaType === "Video";
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

  const [userInteracted, setUserInteracted] = useState(
    () => navigator.userActivation?.hasBeenActive ?? false,
  );

  // Listen for user interaction to allow unmuted sound
  useEffect(() => {
    if (userInteracted) return;
    const markInteracted = () => setUserInteracted(true);
    document.addEventListener("click", markInteracted, { once: true });
    document.addEventListener("touchstart", markInteracted, { once: true });
    document.addEventListener("keydown", markInteracted, { once: true });
    document.addEventListener("pointerdown", markInteracted, { once: true });
    return () => {
      document.removeEventListener("click", markInteracted);
      document.removeEventListener("touchstart", markInteracted);
      document.removeEventListener("keydown", markInteracted);
      document.removeEventListener("pointerdown", markInteracted);
    };
  }, [userInteracted]);

  // Video autoplay & sound handling
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const vid = videoRef.current;

    if (userInteracted) {
      vid.muted = false;
    }
    vid.play().catch(() => {
      // Browser blocked unmuted autoplay on fresh page load — fallback to muted autoplay so it plays immediately
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }, [isVideo, userInteracted, post.mediaUrl]);

  return (
    <div
      className="rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg shadow-md mb-8"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-light)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b"
        style={{ borderColor: "var(--border-light)" }}
      >
        {post.userId ? (
          <Link
            to={`/profile/${post.userId.username}`}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden border flex items-center justify-center bg-zinc-800"
              style={{ borderColor: "var(--border-light)" }}
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-800" />
            <span className="font-bold text-sm text-zinc-500">
              Unknown User
            </span>
          </div>
        )}

        <div
          className="items-center gap-1.5 text-xs flex"
          style={{ color: "var(--text-muted)" }}
        >
          <Clock size={12} />
          <span>{postDate}</span>
        </div>
      </div>

      {/* Media */}
      <div
        className="relative overflow-hidden flex items-center justify-center w-full"
        style={{ height: "520px", backgroundColor: "var(--bg-tertiary)" }}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={post.mediaUrl}
            aria-label={post.altText || post.caption || "Video post"}
            poster={getVideoPosterUrl(post.mediaUrl, 600)}
            preload="metadata"
            className="w-full h-full object-contain"
            controls
            controlsList="nodownload"
            loop
            playsInline
          />
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.altText || post.caption || "post"}
            className="w-full h-full object-contain"
          />
        )}

        {post.altText && (
          <div className="post-detail-alt-trigger">
            <Info size={16} />
            <div className="post-detail-alt-tooltip">{post.altText}</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 flex flex-col gap-2.5">
        <div
          className="flex items-center justify-between text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="font-medium flex items-center gap-1">
            <Eye size={13} />
            {viewCount} {viewCount === 1 ? "view" : "views"}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/posts/${post._id}`,
                );
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 3000);
              }}
              className="flex items-center justify-center p-1.5 rounded-lg hover:bg-(--surface-hover) transition-all cursor-pointer border-none bg-transparent"
              style={{
                color: isCopied
                  ? "#22c55e"
                  : isLinkHovered
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
              }}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
              title="Copy link"
            >
              {isCopied ? <Check size={19} /> : <Link2 size={19} />}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center p-1.5 rounded-lg hover:bg-(--surface-hover) transition-all cursor-pointer border-none bg-transparent"
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
        </div>

        {post.caption && (
          <div className="flex flex-col">
            <p
              className="text-sm leading-relaxed whitespace-pre-wrap"
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
          </div>
        )}
      </div>
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={{ ...post, postViewCount: viewCount }}
      />
    </div>
  );
}
