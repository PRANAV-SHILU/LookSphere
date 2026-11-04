import { useState, useRef, useEffect, Suspense } from "react";
import { useLoaderData, Await, Link, useRevalidator } from "react-router-dom";
import {
  User,
  Clock,
  Video,
  Info,
} from "lucide-react";
import { PageLoader, BackButton } from "../shared-components/shared-components";
import { getVideoPosterUrl } from "../utils/cloudinaryOptimizer";
import PostDetailModal from "../modals/PostDetailModal";
import PostInteractions from "../components/post/PostInteractions";
import { trackPostImpression } from "../services/postService";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { applyPostInteraction } from "../utils/interactionUtils";

export default function PostDetail() {
  const { post } = useLoaderData();
  const revalidator = useRevalidator();

  return (
    <div className="flex-col mt-6 px-0 py-4 pb-24 gap-6 max-w-xl mx-auto min-h-screen md:py-8 md:pb-8 relative flex">
      <div className="justify-between flex items-center">
        <BackButton to="/feed" label="Back to Feed" />
      </div>

      <Suspense
        fallback={
          <div className="justify-center h-64 flex items-center">
            <PageLoader />
          </div>
        }
      >
        <Await
          resolve={post}
          errorElement={
            <DataErrorState
              skeleton={PageLoader}
              message="Failed to load post. Check your network and try again."
              onRetry={() => revalidator.revalidate()}
            />
          }
        >
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

  const [prevPost, setPrevPost] = useState(post);
  const [currentPost, setCurrentPost] = useState(post);
  const videoRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasTrackedImpression = useRef(false);

  if (post !== prevPost) {
    setPrevPost(post);
    setCurrentPost(post);
  }

  const handleInteraction = (postId, updatedData) => {
    setCurrentPost((prev) => applyPostInteraction(prev, postId, updatedData));
  };

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const postAuthorId = currentPost?.userId?._id || currentPost?.userId;
  const isOwnPost =
    currentUser &&
    postAuthorId &&
    currentUser._id === postAuthorId;

  // Increment impression count when opening post via URL (if not own post)
  useEffect(() => {
    if (!currentPost?._id || hasTrackedImpression.current || isOwnPost) return;

    hasTrackedImpression.current = true;
    // Optimistically update impression count locally immediately
    setCurrentPost((prev) => ({
      ...prev,
      counts: {
        ...prev?.counts,
        impression: (prev?.counts?.impression ?? 0) + 1,
      },
    }));

    // Passive fire-and-forget impression tracking in background
    trackPostImpression(currentPost._id).catch(() => {});
  }, [currentPost?._id, isOwnPost]);

  const isVideo = currentPost?.mediaType === "Video";
  const postDate = currentPost?.createdAt
    ? new Date(currentPost.createdAt).toLocaleString(undefined, {
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

    if (isModalOpen) {
      vid.pause();
      vid.muted = true;
      return;
    }

    if (userInteracted) {
      vid.muted = false;
    }
    vid.play().catch(() => {
      // Browser blocked unmuted autoplay on fresh page load — fallback to muted autoplay so it plays immediately
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }, [isVideo, userInteracted, post.mediaUrl, isModalOpen]);

  return (
    <div
      className="flex-col mb-8 rounded-2xl border overflow-hidden shadow-md flex transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-light)",
      }}
    >
      {/* Header */}
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
              className="w-9 h-9 rounded-full overflow-hidden border justify-center bg-zinc-800 flex items-center"
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
          <div className="gap-3 flex items-center">
            <div className="w-9 h-9 rounded-full bg-zinc-800" />
            <span className="font-bold text-sm text-zinc-500">
              Unknown User
            </span>
          </div>
        )}

        <div
          className="gap-1.5 text-xs items-center flex"
          style={{ color: "var(--text-muted)" }}
        >
          <Clock size={12} />
          <span>{postDate}</span>
        </div>
      </div>

      {/* Media */}
      <div
        className="overflow-hidden justify-center w-full relative flex items-center"
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
      <div className="flex-col p-4 gap-2.5 flex">
        <PostInteractions
          key={currentPost?._id}
          post={currentPost}
          onMaximize={() => setIsModalOpen(true)}
          onInteraction={handleInteraction}
        />

        {currentPost?.caption && (
          <div className="flex-col flex">
            <p
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--text-secondary)" }}
            >
              {currentPost.userId && (
                <strong
                  className="mr-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentPost.userId.username}
                </strong>
              )}
              {currentPost.caption}
            </p>
          </div>
        )}
      </div>
      <PostDetailModal
        key={currentPost?._id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={currentPost}
        onInteraction={handleInteraction}
      />
    </div>
  );
}
