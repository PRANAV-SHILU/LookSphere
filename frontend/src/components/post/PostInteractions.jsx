import { useState } from "react";
import {
  Sparkles,
  MessageCircle,
  Repeat2,
  Bookmark,
  Link2,
  Check,
  Maximize2,
  Eye,
  Clock,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { interactionService } from "../../services/interactionService";
import {
  calculateNextInteraction,
  invalidateInteractionsCache,
} from "../../utils/interactionUtils";
import InteractionsListModal from "../../modals/InteractionsListModal";

const PostInteractions = ({ post, onMaximize, onInteraction }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [prevPost, setPrevPost] = useState(post);
  const [activeModal, setActiveModal] = useState(null); // null | 'spark' | 'reshare'

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

  // Sync state if post prop updates in parent
  if (post !== prevPost) {
    setPrevPost(post);
    setCounts({
      spark: post?.counts?.spark ?? 0,
      reshare: post?.counts?.reshare ?? 0,
      archive: post?.counts?.archive ?? 0,
      comment: post?.counts?.comment ?? 0,
    });
    setHas({
      sparked: Boolean(post?.has?.sparked),
      reshared: Boolean(post?.has?.reshared),
      archived: Boolean(post?.has?.archived),
    });
  }

  const impressionCount = post?.counts?.impression ?? 0;
  const postDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  /**
   * Post Interaction Handler
   *
   * Step 1: Authentication Guard - verify token exists before interacting.
   * Step 2: Optimistic Calculation - compute next counts and flags immediately.
   * Step 3: Local State Update - update PostInteractions button states instantly.
   * Step 4: Parent Synchronization - notify parent handler (syncPostInteraction) to
   *         synchronize across image, video, reshare, and archived tabs.
   * Step 5: Cache Invalidation - clear cached user list for this post so reopening
   *         the interactions modal fetches fresh data reflecting this action.
   * Step 6: Asynchronous Network Mutation - fire toggle API in background without blocking UI.
   */
  const handleInteraction = (action) => {
    // Step 1: Authentication Guard
    const token = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      toast.info("You need to log in to interact with posts.");
      return;
    }

    // Step 2: Optimistic Calculation
    const result = calculateNextInteraction(counts, has, action);
    if (!result) return;

    const { nextCounts, nextHas } = result;

    // Step 3: Local State Update
    setHas(nextHas);
    setCounts(nextCounts);

    const postId = post?._id;

    // Step 4: Parent Synchronization across all tabs and open modals
    if (onInteraction && postId) {
      onInteraction(postId, { counts: nextCounts, has: nextHas });
    }

    // Step 5 & 6: Cache Invalidation and Background API Call
    if (postId) {
      const apiAction =
        action === "sparked"
          ? "spark"
          : action === "reshared"
            ? "reshare"
            : action === "archived"
              ? "archive"
              : action;

      // Invalidate cached interactions modal list so reopening reflects the user's toggle
      invalidateInteractionsCache(postId, apiAction);

      // Fire API call without blocking UI
      interactionService.toggleInteraction(postId, apiAction).catch(() => {});
    }
  };

  return (
    <div className="flex-col gap-2.5 w-full flex">
      <div className="pt-2 w-full justify-between flex items-center">
        {/* Left side: Spark, Comment, Reshare */}
        <div
          className={`flex items-center xsm:gap-6 ${
            counts.spark > 0 || counts.reshare > 0 ? "gap-3" : "gap-5"
          }`}
        >
          {/* Spark */}
          <button
            onClick={() => handleInteraction("spark")}
            className="flex-col gap-1 bg-transparent border-none flex items-start cursor-pointer group active:scale-90 transition-transform duration-200"
          >
            <div className="gap-0.5 flex items-center xsm:gap-1.5">
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
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal("spark");
                  }}
                  title="View sparks"
                  className="gap-0.5 flex items-center cursor-pointer hover:opacity-80"
                >
                  <span
                    className={`text-[13px] font-medium transition-colors duration-500 ease-in-out ${
                      has.sparked
                        ? "text-yellow-400"
                        : "text-(--text-muted) group-hover:text-yellow-400"
                    }`}
                  >
                    {counts.spark}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-colors duration-500 ease-in-out ${
                      has.sparked
                        ? "text-yellow-400"
                        : "text-(--text-muted) group-hover:text-yellow-400"
                    }`}
                  />
                </div>
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
          {/* 
        <button className="flex-col gap-1 bg-transparent border-none flex items-center cursor-pointer group active:scale-90 transition-transform duration-200">
          <div className="gap-0.5 flex items-center xsm:gap-1.5">
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
          <span className="text-[10px] font-medium text-(--text-muted) hidden xsm:inline group-hover:text-(--text-primary) transition-colors duration-300">
            Comment
          </span>
        </button>
        */}

          {/* Reshare */}
          <button
            onClick={() => handleInteraction("reshare")}
            className="flex-col gap-1 bg-transparent border-none flex items-center cursor-pointer group active:scale-90 transition-transform duration-200"
          >
            <div className="gap-0.5 flex items-center xsm:gap-1.5">
              <Repeat2
                size={22}
                className={`transition-all duration-500 ease-in-out ${
                  has.reshared
                    ? "text-blue-400 scale-110 rotate-180"
                    : "text-(--text-muted) scale-100 rotate-0 group-hover:text-blue-400"
                }`}
              />
              {counts.reshare > 0 && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal("reshare");
                  }}
                  title="View reshares"
                  className="gap-0.5 flex items-center cursor-pointer hover:opacity-80"
                >
                  <span
                    className={`text-[13px] font-medium transition-colors duration-500 ease-in-out ${
                      has.reshared
                        ? "text-blue-400"
                        : "text-(--text-muted) group-hover:text-blue-400"
                    }`}
                  >
                    {counts.reshare}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`transition-colors duration-500 ease-in-out ${
                      has.reshared
                        ? "text-blue-400"
                        : "text-(--text-muted) group-hover:text-blue-400"
                    }`}
                  />
                </div>
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

          {/* Share (Copy Link) */}
          <button
            className="flex-col gap-1 bg-transparent border-none flex items-center cursor-pointer group active:scale-90 transition-transform duration-200"
            onClick={() => {
              const baseUrl =
                window.location.origin || import.meta.env.VITE_FRONTEND_URL;
              navigator.clipboard.writeText(`${baseUrl}/posts/${post?._id}`);
              setIsCopied(true);
              toast.success("Post link copied to clipboard!");
              setTimeout(() => setIsCopied(false), 3000);
            }}
            title="Copy link"
          >
            <div className="gap-1.5 flex items-center">
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
        </div>

        {/* Right side: Share & Archive */}
        <div className="gap-3 flex items-center xsm:gap-6">
          {/* Maximize */}
          {onMaximize && (
            <button
              className="flex-col gap-1 bg-transparent border-none flex items-center cursor-pointer group active:scale-90 transition-transform duration-200"
              onClick={onMaximize}
              title="View in full screen"
            >
              <div className="gap-1.5 flex items-center">
                <Maximize2
                  size={22}
                  className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-300"
                />
              </div>
              <span className="text-[10px] font-medium text-(--text-muted) hidden xsm:inline group-hover:text-(--text-primary) transition-colors duration-300">
                Expand
              </span>
            </button>
          )}

          {/* Archive */}
          <button
            onClick={() => handleInteraction("archive")}
            className="flex-col gap-1 bg-transparent border-none flex items-center cursor-pointer group active:scale-90 transition-transform duration-200"
          >
            <div className="gap-0.5 flex items-center xsm:gap-1.5">
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

      {/* Impressions & Created Date */}
      <div
        className="justify-between text-xs flex items-center"
        style={{ color: "var(--text-muted)" }}
      >
        <div className="gap-1 font-medium flex items-center">
          <Eye size={13} />
          <span>
            {impressionCount}{" "}
            {impressionCount === 1 ? "impression" : "impressions"}
          </span>
        </div>
        {postDate && (
          <div
            className="gap-1.5 text-xs items-center flex"
            style={{ color: "var(--text-muted)" }}
          >
            <Clock size={12} />
            <span>{postDate}</span>
          </div>
        )}
      </div>
      
      {/* Spark / Reshare List Modal */}
      <InteractionsListModal
        isOpen={Boolean(activeModal)}
        postId={post?._id}
        type={activeModal || "spark"}
        count={activeModal === "spark" ? counts.spark : counts.reshare}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default PostInteractions;
