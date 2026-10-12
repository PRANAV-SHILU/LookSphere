import { useState } from "react";
import {
  Sparkles,
  MessageCircle,
  Repeat2,
  Bookmark,
  Link2,
  Check,
  Maximize2,
} from "lucide-react";
import { toast } from "react-toastify";
import { interactionService } from "../../services/interactionService";

const PostInteractions = ({ post, onMaximize }) => {
  const [isCopied, setIsCopied] = useState(false);

  const [counts, setCounts] = useState({
    spark: post?.counts?.spark ?? 0,
    reshare: post?.counts?.reshare ?? 0,
    archive: post?.counts?.archive ?? 0,
    comment: post?.counts?.comment ?? 0,
  });

  const [has, setHas] = useState({
    sparked: Boolean(post?.has?.sparked),
    reshared: Boolean(post?.has?.reshared),
    archived: Boolean(post?.has?.archived),
  });

  // Local state toggle function with promise-based API call (no await, no rollback)
  const handleInteraction = (action) => {
    const actionConfig = {
      spark: { stateKey: "sparked", countKey: "spark" },
      sparked: { stateKey: "sparked", countKey: "spark" },
      reshare: { stateKey: "reshared", countKey: "reshare" },
      reshared: { stateKey: "reshared", countKey: "reshare" },
      archive: { stateKey: "archived", countKey: "archive" },
      archived: { stateKey: "archived", countKey: "archive" },
    };

    const target = actionConfig[action];
    if (!target) return;

    const { stateKey, countKey } = target;
    const isCurrentlyActive = has[stateKey];

    setHas((prev) => ({
      ...prev,
      [stateKey]: !isCurrentlyActive,
    }));

    setCounts((prev) => ({
      ...prev,
      [countKey]: isCurrentlyActive
        ? Math.max(0, (prev[countKey] || 0) - 1)
        : (prev[countKey] || 0) + 1,
    }));

    // Promise-based API call without async/await or rollback
    const postId = post?._id || post?.id;
    if (postId) {
      const apiAction =
        action === "sparked"
          ? "spark"
          : action === "reshared"
            ? "reshare"
            : action === "archived"
              ? "archive"
              : action;

      interactionService.toggleInteraction(postId, apiAction).catch(() => {});
    }
  };

  return (
    <div className="w-full flex items-center justify-between pt-2">
      {/* Left side: Spark, Comment, Reshare */}
      <div
        className={`flex items-center xsm:gap-6 ${
          counts.spark > 0 || counts.reshare > 0 ? "gap-3" : "gap-5"
        }`}
      >
        {/* Spark */}
        <button
          onClick={() => handleInteraction("spark")}
          className="flex flex-col items-start gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200"
        >
          <div className="flex items-center gap-0.5 xsm:gap-1.5">
            <Sparkles
              size={22}
              fill={has.sparked ? "currentColor" : "none"}
              className={`transition-all duration-500 ease-in-out ${
                has.sparked
                  ? "text-yellow-400 scale-110"
                  : "text-(--text-muted) scale-100 group-hover:text-yellow-400"
              }`}
            />
            {counts.spark > 0 && (
              <span
                className={`text-[13px] font-medium transition-colors duration-500 ease-in-out ${
                  has.sparked
                    ? "text-yellow-400"
                    : "text-(--text-muted) group-hover:text-yellow-400"
                }`}
              >
                {counts.spark}
              </span>
            )}
          </div>
          <span
            className={`hidden xsm:inline text-[10px] font-medium transition-colors duration-500 ease-in-out ${
              has.sparked
                ? "text-yellow-400"
                : "text-(--text-muted) group-hover:text-yellow-400"
            }`}
          >
            Spark
          </span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200">
          <div className="flex items-center gap-0.5 xsm:gap-1.5">
            <MessageCircle
              size={22}
              className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300"
            />
            {counts.comment > 0 && (
              <span className="text-[13px] font-medium text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300">
                {counts.comment}
              </span>
            )}
          </div>
          <span className="hidden xsm:inline text-[10px] font-medium text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300">
            Comment
          </span>
        </button>

        {/* Reshare */}
        <button
          onClick={() => handleInteraction("reshare")}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200"
        >
          <div className="flex items-center gap-0.5 xsm:gap-1.5">
            <Repeat2
              size={22}
              className={`transition-all duration-500 ease-in-out ${
                has.reshared
                  ? "text-blue-400 scale-110 rotate-180"
                  : "text-(--text-muted) scale-100 rotate-0 group-hover:text-blue-400"
              }`}
            />
            {counts.reshare > 0 && (
              <span
                className={`text-[13px] font-medium transition-colors duration-500 ease-in-out ${
                  has.reshared
                    ? "text-blue-400"
                    : "text-(--text-muted) group-hover:text-blue-400"
                }`}
              >
                {counts.reshare}
              </span>
            )}
          </div>
          <span
            className={`hidden xsm:inline text-[10px] font-medium transition-colors duration-500 ease-in-out ${
              has.reshared
                ? "text-blue-400"
                : "text-(--text-muted) group-hover:text-blue-400"
            }`}
          >
            Reshare
          </span>
        </button>
      </div>

      {/* Right side: Share & Archive */}
      <div className="flex items-center gap-3 xsm:gap-6">
        {/* Share (Copy Link) */}
        <button
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200"
          onClick={() => {
            const baseUrl =
              window.location.origin || import.meta.env.VITE_FRONTEND_URL;
            navigator.clipboard.writeText(`${baseUrl}/posts/${post?._id}`);
            setIsCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setIsCopied(false), 3000);
          }}
          title="Copy link"
        >
          <div className="flex items-center gap-1.5">
            {isCopied ? (
              <Check
                size={22}
                className="text-green-500 transition-all duration-300 scale-110"
              />
            ) : (
              <Link2
                size={22}
                className="text-(--text-muted) group-hover:text-blue-400 transition-colors duration-300"
              />
            )}
          </div>
          <span
            className={`hidden xsm:inline text-[10px] font-medium transition-colors duration-300 ${
              isCopied
                ? "text-green-500"
                : "text-(--text-muted) group-hover:text-blue-400"
            }`}
          >
            {isCopied ? "Copied" : "Share"}
          </span>
        </button>

        {/* Maximize */}
        {onMaximize && (
          <button
            className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200"
            onClick={onMaximize}
            title="View in full screen"
          >
            <div className="flex items-center gap-1.5">
              <Maximize2
                size={22}
                className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300"
              />
            </div>
            <span className="hidden xsm:inline text-[10px] font-medium text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300">
              Expand
            </span>
          </button>
        )}

        {/* Archive */}
        <button
          onClick={() => handleInteraction("archive")}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group active:scale-90 transition-transform duration-200"
        >
          <div className="flex items-center gap-0.5 xsm:gap-1.5">
            <Bookmark
              size={22}
              fill={has.archived ? "currentColor" : "none"}
              className={`transition-all duration-500 ease-in-out ${
                has.archived
                  ? "text-emerald-400 scale-110"
                  : "text-(--text-muted) scale-100 group-hover:text-emerald-400"
              }`}
            />
            {counts.archive > 0 && (
              <span
                className={`text-[13px] font-medium transition-colors duration-500 ease-in-out ${
                  has.archived
                    ? "text-emerald-400"
                    : "text-(--text-muted) group-hover:text-emerald-400"
                }`}
              >
                {counts.archive}
              </span>
            )}
          </div>
          <span
            className={`hidden xsm:inline text-[10px] font-medium transition-colors duration-500 ease-in-out ${
              has.archived
                ? "text-emerald-400"
                : "text-(--text-muted) group-hover:text-emerald-400"
            }`}
          >
            Archive
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostInteractions;
