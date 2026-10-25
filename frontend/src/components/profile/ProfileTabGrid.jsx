import React from "react";
import { Plus, AlertCircle, Bookmark, Repeat2, Sparkles, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { getOptimizedMediaUrl, getVideoPosterUrl } from "../../utils/cloudinaryOptimizer";

export const ProfileVideoCard = React.memo(function ProfileVideoCard({
  post,
  onClick,
  isReshared = false,
  isSparked = false,
  isArchived = false,
}) {
  const videoRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    });
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const posterUrl = getVideoPosterUrl(post.mediaUrl, 300);

  return (
    <div
      className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer relative group"
      style={{ borderRadius: "var(--radius-sm)" }}
      onClick={() => onClick(post)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPlaying ? (
        <video
          ref={videoRef}
          src={`${post.mediaUrl}#t=1.0`}
          poster={posterUrl}
          preload="none"
          aria-label={post.altText || post.caption || "Video post - LookSphere"}
          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          muted
          loop
          playsInline
          autoPlay
          draggable={false}
        />
      ) : (
        <img
          src={posterUrl}
          alt={post.caption || "video thumbnail - LookSphere"}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          draggable={false}
        />
      )}

      {/* Top right badges container */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 pointer-events-none">
        {isReshared && (
          <div
            className="p-1.5 rounded-md backdrop-blur-md shadow-md text-blue-400"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
            title="Reshared post"
          >
            <Repeat2 size={14} />
          </div>
        )}
        {isSparked && (
          <div
            className="p-1.5 rounded-md backdrop-blur-md shadow-md text-yellow-400"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
            title="Sparked post"
          >
            <Sparkles size={14} />
          </div>
        )}
        {isArchived && (
          <div
            className="p-1.5 rounded-md backdrop-blur-md shadow-md text-emerald-400"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
            title="Archived post"
          >
            <Bookmark size={14} />
          </div>
        )}
        <div
          className="p-1.5 rounded-md backdrop-blur-md shadow-md text-white transition-opacity group-hover:opacity-90"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          title="Video post"
        >
          <VideoIcon size={14} />
        </div>
      </div>
    </div>
  );
});

export const ProfileEmptyState = React.memo(function ProfileEmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center pt-8 pb-16 text-center mx-auto max-w-sm px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm"
        style={{
          backgroundColor: "var(--surface-input)",
          border: "1px solid var(--border-normal)",
        }}
      >
        {Icon && <Icon size={38} style={{ color: "var(--text-muted)" }} />}
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="max-w-sm text-sm md:text-base leading-relaxed mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary mt-4 flex items-center gap-1.5 px-5 py-2 text-sm font-medium"
        >
          <Plus size={16} />
          {actionText}
        </button>
      )}
    </div>
  );
});

export function ProfileTabSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="aspect-square skeleton-box animate-pulse"
          style={{ borderRadius: "var(--radius-sm)" }}
        />
      ))}
    </>
  );
}

export default function ProfileTabGrid({
  tabType = "images", // "images" | "videos" | "reshare" | "sparked" | "archive"
  items = [],
  isLoading = false,
  error = null,
  user,
  isOwnProfile = false,
  onPostClick,
  onTriggerUpload,
  onRetry,
}) {
  const displayName = user?.tagline || (user?.username ? `@${user.username}` : "This user");

  // Tab configurations
  const config = {
    images: {
      uploadType: "Image",
      actionText: isOwnProfile && onTriggerUpload ? "Share Image" : null,
      onAction: isOwnProfile && onTriggerUpload ? () => onTriggerUpload("Image") : null,
      emptyIcon: ImageIcon,
      emptyTitle: "No Images Yet",
      emptyDesc: isOwnProfile
        ? "You haven't uploaded any images yet. Share your first image!"
        : `${displayName} hasn't uploaded any images yet.`,
    },
    videos: {
      uploadType: "Video",
      actionText: isOwnProfile && onTriggerUpload ? "Share Video" : null,
      onAction: isOwnProfile && onTriggerUpload ? () => onTriggerUpload("Video") : null,
      emptyIcon: VideoIcon,
      emptyTitle: "No Videos Yet",
      emptyDesc: isOwnProfile
        ? "You haven't uploaded any videos yet. Share your first video clip!"
        : `${displayName} hasn't uploaded any videos yet.`,
    },
    reshare: {
      uploadType: null,
      actionText: null,
      onAction: null,
      emptyIcon: Repeat2,
      emptyTitle: "No Reshares Yet",
      emptyDesc: isOwnProfile
        ? "You haven't reshared any posts yet. Reshared posts will appear here."
        : `${displayName} hasn't reshared any posts yet.`,
    },
    sparked: {
      uploadType: null,
      actionText: null,
      onAction: null,
      emptyIcon: Sparkles,
      emptyTitle: "No Sparks Yet",
      emptyDesc: "You haven't sparked any posts yet. Posts you spark will appear here.",
    },
    archive: {
      uploadType: null,
      actionText: null,
      onAction: null,
      emptyIcon: Bookmark,
      emptyTitle: "No Archived Posts",
      emptyDesc: "You haven't archived any posts yet. Archived posts will appear here.",
    },
  }[tabType] || {};

  // Loading skeleton state matching LookSphere design system
  if (isLoading) {
    return <ProfileTabSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 text-center mx-auto max-w-sm">
        <AlertCircle size={40} className="text-red-400 mb-3" />
        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Failed to load {tabType}
        </h3>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // Proper profile empty component for each tab
  if (!items || items.length === 0) {
    return (
      <ProfileEmptyState
        icon={config.emptyIcon || ImageIcon}
        title={config.emptyTitle || "No Posts Yet"}
        description={config.emptyDesc || "No content found."}
        actionText={config.actionText}
        onAction={config.onAction}
      />
    );
  }

  // Content grid
  return (
    <>
      {/* "Add Image" / "Add Video" grid tile preserved when user has posts */}
      {isOwnProfile && config.uploadType && onTriggerUpload && (
        <div className="contents">
          <div
            className="add-media-tile aspect-square w-full"
            onClick={() => onTriggerUpload(config.uploadType)}
          >
            <Plus size={36} className="mb-2" />
            <span className="font-medium text-sm md:text-base">
              Add {config.uploadType}
            </span>
          </div>
        </div>
      )}

      {items.map((post) => {
        const isVideo = post.mediaType === "Video";
        const isReshared = tabType === "reshare";
        const isSparked = tabType === "sparked";
        const isArchived = tabType === "archive";

        // If post is a Video, use ProfileVideoCard with hover preview & indicators
        if (isVideo) {
          return (
            <ProfileVideoCard
              key={post._id}
              post={post}
              onClick={onPostClick}
              isReshared={isReshared}
              isSparked={isSparked}
              isArchived={isArchived}
            />
          );
        }

        // Image posts
        const thumbUrl = getOptimizedMediaUrl(post.mediaUrl, { width: 300 });

        return (
          <div
            key={post._id}
            className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer relative group"
            style={{ borderRadius: "var(--radius-sm)" }}
            onClick={() => onPostClick(post)}
          >
            <img
              src={thumbUrl}
              alt={post.altText || post.caption || "post - LookSphere"}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover hover:opacity-90 group-hover:scale-105 transition-all duration-300"
              draggable={false}
            />
            {isReshared && (
              <div
                className="absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-md shadow-md text-blue-400 pointer-events-none"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                title="Reshared post"
              >
                <Repeat2 size={14} />
              </div>
            )}
            {isSparked && (
              <div
                className="absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-md shadow-md text-yellow-400 pointer-events-none"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                title="Sparked post"
              >
                <Sparkles size={14} />
              </div>
            )}
            {isArchived && (
              <div
                className="absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-md shadow-md text-emerald-400 pointer-events-none"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                title="Archived post"
              >
                <Bookmark size={14} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
