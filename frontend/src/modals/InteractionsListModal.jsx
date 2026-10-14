import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Sparkles, Repeat2, Loader2, User as UserIcon } from "lucide-react";
import { interactionService } from "../services/interactionService";
import {
  getCachedInteractions,
  setCachedInteractions,
  hasCachedInteractions,
} from "../utils/interactionUtils";

export default function InteractionsListModal({
  isOpen,
  onClose,
  postId,
  type = "spark", // "spark" | "reshare"
  title,
  count = 0,
}) {
  const overlayRef = useRef(null);
  const cachedUsers = postId ? getCachedInteractions(postId, type) : null;

  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Users to display: prioritize cache if available, else fetchedUsers
  const users = cachedUsers || fetchedUsers;

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch interactions when modal opens with postId and type (only if not cached)
  useEffect(() => {
    if (!isOpen || !postId) return;

    if (hasCachedInteractions(postId, type)) {
      return;
    }

    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        setLoading(true);
        setError(null);
      }
    });

    interactionService
      .getPostInteractions(postId, type)
      .then((res) => {
        if (!isMounted) return;
        const interactionItems = res?.data || [];
        // Extract populated user objects
        const userList = interactionItems
          .map((item) => item.userId)
          .filter(Boolean);
        setCachedInteractions(postId, type, userList);
        setFetchedUsers(userList);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load interactions:", err);
        setError("Failed to load users. Please try again.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, postId, type]);

  if (!isOpen) return null;

  const isSpark = type === "spark";
  const defaultTitle = isSpark ? "Sparks" : "Reshares";
  const modalTitle = title || defaultTitle;
  const displayCount = count || users.length;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="p-4 z-70 justify-center bg-black/60 fixed inset-0 flex items-center backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="flex-col p-5 w-full max-w-sm rounded-2xl border border-(--border-light) bg-(--surface-card) shadow-2xl overflow-hidden max-h-[80vh] relative flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-3 justify-between border-b border-(--border-light) flex items-center">
          <div className="gap-2 flex items-center">
            {isSpark ? (
              <Sparkles size={18} className="text-yellow-400" />
            ) : (
              <Repeat2 size={18} className="text-blue-400" />
            )}
            <h3 className="text-base font-semibold text-(--text-primary)">
              {modalTitle}
            </h3>
            {displayCount > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-(--surface-hover) text-(--text-muted) font-medium">
                {displayCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface-hover) transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 my-2 px-2 overflow-y-auto -mx-2 custom-scrollbar">
          {loading ? (
            <div className="flex-col py-12 gap-2 justify-center text-(--text-muted) flex items-center">
              <Loader2 size={24} className="text-(--text-primary) animate-spin" />
              <span className="text-xs">Loading {type}s...</span>
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex-col py-10 justify-center text-center flex items-center">
              <div className="mb-3 w-12 h-12 rounded-full bg-(--surface-hover) justify-center flex items-center">
                {isSpark ? (
                  <Sparkles size={24} className="text-yellow-400" />
                ) : (
                  <Repeat2 size={24} className="text-blue-400" />
                )}
              </div>
              <p className="text-sm text-(--text-primary) fon fix">
                No {type}s yet
              </p>
              <p className="mt-1 text-xs text-(--text-muted)">
                {isSpark
                  ? "Be the first one to spark this post!"
                  : "Be the first one to reshare this post!"}
              </p>
            </div>
          ) : (
            <div className="flex-col flex divide-y divide-(--border-light)/50">
              {users.map((user, idx) => (
                <Link
                  key={user._id || idx}
                  to={`/profile/${user.username}`}
                  onClick={onClose}
                  className="gap-3 py-2.5 px-2 justify-between rounded-lg text-inherit flex items-center hover:bg-(--surface-hover) transition-colors no-underline group cursor-pointer"
                >
                  <div className="gap-3 min-w-0 flex items-center">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border border-(--border-light) shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-(--surface-hover) border border-(--border-light) justify-center text-(--text-muted) flex items-center shrink-0">
                        <UserIcon size={18} />
                      </div>
                    )}
                    <div className="flex-col min-w-0 flex">
                      <span className="text-sm font-semibold text-(--text-primary) truncate">
                        {user.username}
                      </span>
                      {user.name && (
                        <span className="text-xs text-(--text-muted) truncate">
                          {user.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-(--border-light) bg-(--surface-card) text-(--text-primary) shrink-0 group-hover:bg-(--text-primary) group-hover:text-(--surface-card) transition-all">
                    View profile
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

