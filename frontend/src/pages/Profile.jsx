import React, { useState, Suspense, useEffect } from "react";
import {
  useLoaderData,
  useParams,
  NavLink,
  useSubmit,
  useNavigation,
  Await,
} from "react-router-dom";
import { toast } from "react-toastify";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { User, Link as LinkIcon, Check } from "lucide-react";
import BackButton from "../shared-components/BackButton";
import UploadMediaModal from "../modals/UploadMediaModal";
import PostDetailModal from "../modals/PostDetailModal";
import { trackPostImpression } from "../services/postService";
import {
  syncPostInteraction,
  applyPostInteraction,
} from "../utils/interactionUtils";
import { interactionService } from "../services/interactionService";
import ProfileTabGrid from "../components/profile/ProfileTabGrid";

function Bio({ bio, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = React.useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const prev = textRef.current.style.WebkitLineClamp;
        textRef.current.style.WebkitLineClamp = 4;
        const isOverflowing =
          textRef.current.scrollHeight > textRef.current.clientHeight;
        setShowButton(isOverflowing);
        textRef.current.style.WebkitLineClamp = prev;
      }
    };
    checkOverflow();
    const timeoutId = setTimeout(checkOverflow, 50);
    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [bio]);

  if (!bio) return null;

  return (
    <div className={className}>
      <p
        ref={textRef}
        style={{
          color: "var(--text-secondary)",
          whiteSpace: "pre-wrap",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "unset" : 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}
      >
        {bio}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 p-0 text-sm font-semibold border-none bg-transparent text-blue-400 hover:opacity-80 transition-opacity cursor-pointer"
        >
          {isExpanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}

const ProfileStats = React.memo(function ProfileStats({
  postCount = 0,
  profileViewCount = 0,
  totalPostImpressions = 0,
  isMobile = false,
}) {
  const stats = [
    { value: postCount, label: "posts" },
    { value: profileViewCount, label: "profile views" },
    {
      value: totalPostImpressions,
      label: totalPostImpressions === 1 ? "post impression" : "post impressions",
    },
  ];

  if (isMobile) {
    return (
      <div
        className="mb-1 w-full justify-center sm:hidden flex"
        style={{ color: "var(--text-primary)" }}
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="flex-col flex-1 flex items-center">
            <strong className="font-bold text-base sm:text-lg">{value}</strong>
            <span className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="my-4 gap-4 text-sm hidden sm:flex 4xl:my-6 md:text-base 4xl:text-xl md:gap-6 4xl:gap-10"
      style={{ color: "var(--text-primary)" }}
    >
      {stats.map(({ value, label }) => (
        <span key={label}>
          <strong className="font-semibold">{value}</strong> {label}
        </span>
      ))}
    </div>
  );
});

function ProfileContent({ data, username, submit }) {
  console.log("Profile", data);
  const profileDataObj = data?.data || data || {};
  const { user, images = [], videos = [] } = profileDataObj;

  const [prevImages, setPrevImages] = useState(images);
  const [imagesList, setImagesList] = useState(images);
  const [prevVideos, setPrevVideos] = useState(videos);
  const [videosList, setVideosList] = useState(videos);
  const [resharesList, setResharesList] = useState([]);
  const [hasFetchedReshares, setHasFetchedReshares] = useState(false);
  const [isResharesLoading, setIsResharesLoading] = useState(false);
  const [resharesError, setResharesError] = useState(null);
  const [savedList, setSavedList] = useState([]);
  const [hasFetchedSaved, setHasFetchedSaved] = useState(false);
  const [isSavedLoading, setIsSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState(null);

  if (images !== prevImages) {
    setPrevImages(images);
    setImagesList(images);
  }

  console.log("[Profile Content Render] Lists:", {
    imagesCount: imagesList.length,
    videosCount: videosList.length,
    resharesCount: resharesList.length,
    savedCount: savedList.length,
    imagesList,
    videosList,
    resharesList,
    savedList,
  });

  if (videos !== prevVideos) {
    setPrevVideos(videos);
    setVideosList(videos);
  }

  /**
   * Cross-Tab Interaction Synchronization
   *
   * Step 1: Takes updated interaction counts & flags from PostInteractions / PostDetailModal.
   * Step 2: Uses syncPostInteraction() to simultaneously broadcast the update to:
   *         - selectedPost (keeps open PostDetailModal in sync)
   *         - imagesList   (keeps Images tab in sync)
   *         - videosList   (keeps Videos tab in sync)
   *         - resharesList (keeps Reshares tab in sync)
   *         - savedList    (keeps Saved tab in sync)
   * Step 3: Guarantees consistent status without needing a page refresh or refetch.
   */
  const handleInteraction = (postId, updatedData) => {
    syncPostInteraction(
      [
        setSelectedPost,
        setImagesList,
        setVideosList,
        setResharesList,
        setSavedList,
      ],
      postId,
      updatedData
    );
  };

  useDocumentMetadata(
    user?.username ? `@${user.username}'s profile` : "Profile",
    user?.username
      ? `View @${user.username}'s profile, posts, and media on LookSphere. Connect with friends and explore personal feeds on this social network developed by Pranav Shilu.`
      : "View user profiles, posts, and media on LookSphere. Connect with friends and explore personal feeds on this social network developed by Pranav Shilu.",
  );

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isOwnProfile =
    !username || (currentUser && currentUser.username === username);

  const [activeTab, setActiveTab] = useState("images"); // "images" or "videos"
  const [mediaType, setMediaType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleCopyProfileLink = () => {
    const profileUrl = `${window.location.origin}/profile/${user.username}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setLinkCopied(true);
      toast.success("Profile link copied to clipboard!");
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {
      toast.error("Failed to copy profile link.");
    });
  };

  const handleTriggerUpload = (type) => {
    setMediaType(type);
    setIsModalOpen(true);
  };

  const handleModalSubmit = ({ file, caption, altText }) => {
    const formData = new FormData();
    formData.append("media", file);
    formData.append("type", mediaType);
    formData.append("caption", caption);
    formData.append("altText", altText);

    submit(formData, { method: "post", encType: "multipart/form-data" });
    setIsModalOpen(false);
  };

  const fetchReshares = async (force = false) => {
    if (!user?._id) return;
    if (hasFetchedReshares && !force) return;

    setIsResharesLoading(true);
    setResharesError(null);
    try {
      const response = await interactionService.getUserInteractions(
        user._id,
        "reshare"
      );
      console.log("[Profile] Raw reshares API response:", response);
      const items = response?.data || [];
      // Flatten populated postId objects to conform to post structure
      const formattedPosts = items
        .map((item) => {
          if (!item.postId) return null;
          return {
            ...item.postId,
            resharedAt: item.createdAt,
            has: {
              sparked: Boolean(item.postId.has?.sparked),
              archived: Boolean(item.postId.has?.archived),
              reshared: Boolean(item.postId.has?.reshared),
              // If viewing own profile, user definitely reshared this item
              ...(isOwnProfile ? { reshared: true } : {}),
            },
          };
        })
        .filter(Boolean);

      setResharesList(formattedPosts);
      setHasFetchedReshares(true);
    } catch (err) {
      console.error("Failed to fetch reshares:", err);
      setResharesError(err?.message || "Could not load reshared posts");
    } finally {
      setIsResharesLoading(false);
    }
  };

  const fetchSaved = async (force = false) => {
    if (!user?._id) return;
    if (hasFetchedSaved && !force) return;

    setIsSavedLoading(true);
    setSavedError(null);
    try {
      const response = await interactionService.getUserInteractions(
        user._id,
        "archive"
      );
      console.log("[Profile] Raw saved (archive) API response:", response);
      const items = response?.data || [];
      // Flatten populated postId objects to conform to post structure
      const formattedPosts = items
        .map((item) => {
          if (!item.postId) return null;
          return {
            ...item.postId,
            savedAt: item.createdAt,
            has: {
              sparked: Boolean(item.postId.has?.sparked),
              reshared: Boolean(item.postId.has?.reshared),
              archived: true,
            },
          };
        })
        .filter(Boolean);

      setSavedList(formattedPosts);
      setHasFetchedSaved(true);
    } catch (err) {
      console.error("Failed to fetch saved posts:", err);
      setSavedError(err?.message || "Could not load saved posts");
    } finally {
      setIsSavedLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "reshare" && !hasFetchedReshares) {
      fetchReshares();
    } else if (tab === "saved" && !hasFetchedSaved) {
      fetchSaved();
    }
  };

  const handlePostClick = (post) => {
    const postAuthorId =
      post?.userId?._id || post?.userId || post?.author?._id || post?.author;
    const isCurrentUserAuthor =
      currentUser?._id &&
      postAuthorId &&
      String(postAuthorId) === String(currentUser._id);

    if (!isCurrentUserAuthor && post._id) {
      // Optimistically update impression count locally so modal opens instantly
      const updatedData = {
        counts: { impression: (post.counts?.impression ?? 0) + 1 },
      };
      setSelectedPost(applyPostInteraction(post, post._id, updatedData));
      setImagesList((prev) => applyPostInteraction(prev, post._id, updatedData));
      setVideosList((prev) => applyPostInteraction(prev, post._id, updatedData));
      setResharesList((prev) => applyPostInteraction(prev, post._id, updatedData));
      setSavedList((prev) => applyPostInteraction(prev, post._id, updatedData));

      // Passive fire-and-forget impression tracking in background
      trackPostImpression(post._id).catch(() => {});
    } else {
      setSelectedPost(post);
    }
  };

  if (!data) return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="flex-col pt-16 pb-24 px-4 w-full mx-auto justify-center text-center flex items-center">
        <div
          className="mb-4 w-20 h-20 rounded-full justify-center shadow-sm flex items-center"
          style={{
            backgroundColor: "var(--surface-input)",
            border: "1px solid var(--border-normal)",
          }}
        >
          <User size={38} style={{ color: "var(--text-muted)" }} />
        </div>
        <h2
          className="mb-2 text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          User Not Found
        </h2>
        <p
          className="mb-6 text-sm max-w-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          The profile you are looking for doesn't exist or has been removed.
        </p>
        <BackButton />
      </div>
    );
  }

  return (
    <>
      {isSubmitting && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <div
            className="flex flex-col items-center gap-4 border p-8 max-w-sm w-full mx-4 text-center"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--border-normal)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Spinner animation */}
            <div
              className="w-12 h-12 rounded-full border-4 animate-spin"
              style={{
                borderColor: "var(--border-light)",
                borderTopColor: "var(--primary-500)",
              }}
            />
            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Uploading Post
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Please wait, your post is being uploaded and processed.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="w-full mx-auto pt-8 pb-16 px-0 md:px-8">
        {/* --- Profile Header --- */}
        <section className="max-w-150 4xl:max-w-250 mx-auto flex flex-col items-start gap-3 sm:gap-6 justify-center">
          <div className="flex w-full justify-between items-center sm:my-2">
            <div className="hidden sm:flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl 4xl:text-5xl font-bold tracking-wide">
                {user.username}
              </h1>
              <button
                onClick={handleCopyProfileLink}
                className="shrink-0 flex items-center justify-center rounded-lg transition-all hover:opacity-80 cursor-pointer"
                style={{
                  color: linkCopied
                    ? "var(--success, #22c55e)"
                    : "var(--primary-500)",
                }}
                title={linkCopied ? "Copied!" : "Copy profile link"}
              >
                {linkCopied ? <Check size={18} /> : <LinkIcon size={18} />}
              </button>
            </div>

            {/* --- Back Button --- */}

            <div className="shrink-0 ml-auto">
              <BackButton />
            </div>
          </div>

          <div className="flex flex-row items-start sm:items-start w-full mb-2 4xl:mb-6">
            {/* Profile Image */}
            <div
              className="flex items-center justify-center overflow-hidden border shadow-sm shrink-0 sm:w-37.5 sm:h-37.5 4xl:w-55 4xl:h-55 w-22.5 h-22.5 sm:mr-7 mr-4 4xl:mr-12"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-strong)",
                borderRadius: "56%",
                cursor: user.profileImage ? "pointer" : "default",
              }}
              onClick={() =>
                user.profileImage &&
                setSelectedPost({
                  mediaUrl: user.profileImage,
                  mediaType: "Image",
                })
              }
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`Profile image: ${user.username}${user.tagline ? " - " + user.tagline : ""}`}
                  className="w-full"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              ) : (
                <User size={40} style={{ color: "var(--text-muted)" }} />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-start text-left gap-2 sm:gap-0 mt-1.5 sm:mt-2 4xl:mt-4 4xl:gap-2">
              <div className="sm:hidden flex items-center gap-1.5">
                <h1 className="text-xl font-bold tracking-wide">
                  {user.username}
                </h1>
                <button
                  onClick={handleCopyProfileLink}
                  className="shrink-0 flex items-center justify-center rounded-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    color: linkCopied
                      ? "var(--success, #22c55e)"
                      : "var(--primary-500)",
                  }}
                  title={linkCopied ? "Copied!" : "Copy profile link"}
                >
                  {linkCopied ? <Check size={16} /> : <LinkIcon size={16} />}
                </button>
              </div>
              <h3
                className="text-sm sm:text-base md:text-lg 4xl:text-2xl font-medium sm:font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {user.tagline}
              </h3>

              <ProfileStats
                postCount={user.postCount}
                profileViewCount={user.profileViewCount}
                totalPostImpressions={user.totalPostImpressions || 0}
              />

              <Bio
                bio={user.bio}
                className="hidden sm:flex flex-col items-start text-sm md:text-base 4xl:text-xl leading-relaxed 4xl:leading-loose"
              />
            </div>
          </div>

          <ProfileStats
            postCount={user.postCount}
            profileViewCount={user.profileViewCount}
            totalPostImpressions={user.totalPostImpressions || 0}
            isMobile={true}
          />

          <Bio
            bio={user.bio}
            className="block sm:hidden text-sm md:text-base leading-relaxed"
          />

          {/* Edit Profile Button */}
          {isOwnProfile && (
            <NavLink
              to="/edit-profile"
              className="btn btn-secondary w-[50%] md:w-full mt-4 max-w-62.5"
              style={{ fontSize: "20px", fontWeight: 500, padding: "0" }}
            >
              Edit Profile
            </NavLink>
          )}
        </section>

        <hr className="mt-8" style={{ borderColor: "var(--border-normal)" }} />

        {/* --- Feed Tabs --- */}
        <section className="tab-container mx-auto px-1 py-0.5 sm:p-2 mt-3 sm:mt-5 mb-6 sm:mb-8 4xl:p-2 4xl:gap-3 4xl:mt-8 4xl:mb-12">
          {[
            { id: "images", label: "Images" },
            { id: "videos", label: "Videos" },
            { id: "reshare", label: "Reshare" },
            ...(isOwnProfile ? [{ id: "saved", label: "Archived" }] : []),
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleTabChange(id)}
              className={`tab-btn py-0.5 sm:py-1.5 px-3 sm:px-6 text-sm xs:text-base sm:text-xl 4xl:px-10 4xl:py-4 4xl:text-3xl ${activeTab === id ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </section>

        {/* --- Feed Content --- */}
        <section className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 profile-grid">
            <ProfileTabGrid
              tabType={activeTab}
              items={
                activeTab === "images"
                  ? imagesList
                  : activeTab === "videos"
                  ? videosList
                  : activeTab === "reshare"
                  ? resharesList
                  : activeTab === "saved"
                  ? savedList
                  : []
              }
              isLoading={
                (activeTab === "reshare" && isResharesLoading) ||
                (activeTab === "saved" && isSavedLoading)
              }
              error={
                activeTab === "reshare"
                  ? resharesError
                  : activeTab === "saved"
                  ? savedError
                  : null
              }
              user={user}
              isOwnProfile={isOwnProfile}
              onPostClick={handlePostClick}
              onTriggerUpload={handleTriggerUpload}
              onRetry={() => {
                if (activeTab === "reshare") fetchReshares(true);
                else if (activeTab === "saved") fetchSaved(true);
              }}
            />
          </div>
        </section>

        {isOwnProfile && (
          <UploadMediaModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mediaType={mediaType}
            onSubmit={handleModalSubmit}
          />
        )}

        <PostDetailModal
          key={selectedPost?._id}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          profileUser={user}
          onInteraction={handleInteraction}
        />
      </main>
    </>
  );
}

export default function Profile() {
  const submit = useSubmit();
  const { username } = useParams();
  const { profileData } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [username]);

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Await
        resolve={profileData}
        errorElement={
          <div className="text-center py-10 mt-10">
            Error loading profile data.
          </div>
        }
      >
        {(data) => (
          <ProfileContent
            key={data?.data?.user?._id || data?.user?._id || username || "self"}
            data={data}
            username={username}
            submit={submit}
          />
        )}
      </Await>
    </Suspense>
  );
}
