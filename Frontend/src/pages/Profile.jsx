import { useState } from "react";
import {
  useLoaderData,
  useParams,
  NavLink,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  User,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import BackButton from "../shared-components/BackButton";
import UploadMediaModal from "../modals/UploadMediaModal";
import PostDetailModal from "../modals/PostDetailModal";
import { trackPostView } from "../services/postService";
import { Profile as ProfileAnimation } from "../utils/animation";

function Bio({ bio, className }) {
  if (!bio) return null;
  return (
    <p
      className={className}
      style={{
        color: "var(--text-secondary)",
        whiteSpace: "pre-wrap",
      }}
    >
      {bio}
    </p>
  );
}

function ProfileStats({
  postCount,
  profileViewCount,
  totalPostViews,
  isMobile = false,
}) {
  if (isMobile) {
    return (
      <div className="sm:hidden w-full flex justify-center mb-1" style={{ color: "var(--text-primary)" }}>
        <div className="flex flex-col items-center flex-1">
          <strong className="font-bold text-base sm:text-lg">{postCount || 0}</strong>
          <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>posts</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <strong className="font-bold text-base sm:text-lg">{profileViewCount || 0}</strong>
          <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>profile views</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <strong className="font-bold text-base sm:text-lg">{totalPostViews || 0}</strong>
          <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>post views</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex my-4 4xl:my-6 text-sm md:text-base 4xl:text-xl gap-4 md:gap-6 4xl:gap-10" style={{ color: "var(--text-primary)" }}>
      <span>
        <strong className="font-semibold">{postCount || 0}</strong> posts
      </span>
      <span>
        <strong className="font-semibold">{profileViewCount || 0}</strong>{" "}
        profile views
      </span>
      <span>
        <strong className="font-semibold">{totalPostViews || 0}</strong> post
        views
      </span>
    </div>
  );
}


function ProfileEmptyState({ icon, title, description }) {
  const IconComponent = icon;
  return (
    <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center pt-6 pb-16 text-center mx-auto w-[70%]">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-1">
        <IconComponent size={48} style={{ color: "var(--text-muted)" }} />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="max-w-sm text-sm md:text-base leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
    </div>
  );
}

export default function Profile() {
  const submit = useSubmit();
  const { username } = useParams();
  const { data } = useLoaderData();
  const { user, images = [], videos = [] } = data || {};

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isOwnProfile =
    !username || (currentUser && currentUser.username === username);

  const [activeTab, setActiveTab] = useState("images"); // "images" or "videos"
  const [mediaType, setMediaType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageUploadHovered, setIsImageUploadHovered] = useState(false);
  const [isVideoUploadHovered, setIsVideoUploadHovered] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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

  const handlePostClick = async (post) => {
    if (!isOwnProfile && post._id) {
      const updatedPost = await trackPostView(post._id).catch(() => {});
      setSelectedPost(updatedPost || post);
    } else {
      setSelectedPost(post);
    }
  };

  if (!data)
    return (
      <h2 className="text-center text-muted mt-10">Loading user data...</h2>
    );

  return (
    <>
      <AnimatePresence>
        {isSubmitting && (
          <Motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            {...ProfileAnimation.backdropTransition}
          >
            <Motion.div
              className="flex flex-col items-center gap-4 border p-8 max-w-sm w-full mx-4 text-center"
              style={{
                backgroundColor: "var(--surface-card)",
                borderColor: "var(--border-normal)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-card)",
              }}
              {...ProfileAnimation.dialogTransition}
            >
              {/* Spinner animation */}
              <Motion.div
                className="w-12 h-12 rounded-full border-4"
                style={{
                  borderColor: "var(--border-light)",
                  borderTopColor: "var(--primary-500)",
                }}
                {...ProfileAnimation.spinnerTransition}
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
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.main
        className="w-full mx-auto pt-8 pb-16 px-4 md:px-8"
        {...ProfileAnimation.pageTransition}
      >
        {/* --- Profile Header --- */}
        <section className="max-w-[600px] 4xl:max-w-[1000px] mx-auto flex flex-col items-start gap-3 sm:gap-6 justify-center">
          <div className="flex w-full justify-between items-center sm:my-2">
            <h1 className="hidden sm:block text-2xl md:text-3xl 4xl:text-5xl font-bold tracking-wide">
              {user.username}
            </h1>
 
            {/* --- Back Button --- */}
 
            <div className="shrink-0 ml-auto">
              <BackButton />
            </div>
          </div>
 
          <div className="flex flex-row items-start sm:items-start w-full mb-2 4xl:mb-6">
            {/* Profile Image */}
            <div
              className="flex items-center justify-center overflow-hidden border shadow-sm shrink-0 sm:w-[150px] sm:h-[150px] 4xl:w-[220px] 4xl:h-[220px] w-[90px] h-[90px] sm:mr-7 mr-4 4xl:mr-12"
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
                  alt="Profile"
                  className="w-full"
                  draggable={false}
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
              <h1 className="sm:hidden block text-xl font-bold tracking-wide">
                {user.username}
              </h1>
              <h3
                className="text-sm sm:text-base md:text-lg 4xl:text-2xl font-medium sm:font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {user.tagline}
              </h3>
 
              <ProfileStats
                postCount={user.postCount}
                profileViewCount={user.profileViewCount}
                totalPostViews={user.totalPostViews}
              />
 
              <Bio
                bio={user.bio}
                className="hidden sm:flex whitespace-pre-wrap text-sm md:text-base 4xl:text-xl leading-relaxed 4xl:leading-loose"
              />
            </div>
          </div>

          <ProfileStats
            postCount={user.postCount}
            profileViewCount={user.profileViewCount}
            totalPostViews={user.totalPostViews}
            isMobile={true}
          />

          <Bio
            bio={user.bio}
            className="block sm:hidden whitespace-pre-wrap text-sm md:text-base leading-relaxed"
          />

          {/* Edit Profile Button */}
          {isOwnProfile && (
            <NavLink
              to="/edit-profile"
              className="btn btn-secondary w-[50%] md:w-full mt-4 max-w-[250px]"
              style={{ fontSize: "20px", fontWeight: 500, padding: "0" }}
            >
              Edit Profile
            </NavLink>
          )}
        </section>

        <hr className="mt-8" style={{ borderColor: "var(--border-normal)" }} />

        {/* --- Feed Tabs --- */}
        <section className="tab-container mx-auto px-1 py-0.5 sm:p-2 mt-3 sm:mt-5 mb-6 sm:mb-8 4xl:p-2 4xl:gap-3 4xl:mt-8 4xl:mb-12">
          <button
            onClick={() => setActiveTab("images")}
            className={`tab-btn py-0.5  sm:py-1.5 px-5 sm:px-6 text-lg sm:text-xl 4xl:px-10 4xl:py-4 4xl:text-3xl ${activeTab === "images" ? "active" : ""}`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`tab-btn py-0.5 sm:py-1.5 px-5 sm:px-6 text-lg sm:text-xl 4xl:px-10 4xl:py-4 4xl:text-3xl ${activeTab === "videos" ? "active" : ""}`}
          >
            Videos
          </button>
        </section>

        {/* --- Feed Content --- */}
        <section className="w-full">
          {/* Image Feed */}
          {activeTab === "images" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {images.length > 0 ? (
                <>
                  {isOwnProfile && (
                    <div className="contents">
                      <div
                        className="add-media-tile aspect-square w-full"
                        onClick={() => handleTriggerUpload("Image")}
                      >
                        <Plus size={36} className="mb-2" />
                        <span className="font-medium text-sm md:text-base">
                          Add Image
                        </span>
                      </div>
                    </div>
                  )}
                  {images.map((post) => (
                    <div
                      key={post._id}
                      className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                      style={{ borderRadius: "var(--radius-sm)" }}
                      onClick={() => handlePostClick(post)}
                    >
                      <img
                        src={post.mediaUrl}
                        alt={post.altText || post.caption || "image"}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        draggable={false}
                      />
                    </div>
                  ))}
                </>
              ) : isOwnProfile ? (
                <div
                  className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed cursor-pointer transition-colors duration-200 w-full"
                  style={{
                    borderColor: isImageUploadHovered ? "var(--primary-500)" : "var(--border-strong)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: isImageUploadHovered ? "var(--surface-hover)" : "var(--surface-input)"
                  }}
                  onMouseEnter={() => setIsImageUploadHovered(true)}
                  onMouseLeave={() => setIsImageUploadHovered(false)}
                  onClick={() => handleTriggerUpload("Image")}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <Plus size={24} style={{ color: "var(--primary-500)" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    Share Images
                  </h3>
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    You haven't uploaded any images yet. Click here to share your first image!
                  </p>
                </div>
              ) : (
                <ProfileEmptyState
                  icon={ImageIcon}
                  title="No Images Yet"
                  description={`${user.username} hasn't uploaded any images yet.`}
                />
              )}
            </div>
          )}

          {/* Video Feed */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {videos.length > 0 ? (
                <>
                  {isOwnProfile && (
                    <div className="contents">
                      <div
                        className="add-media-tile aspect-square w-full"
                        onClick={() => handleTriggerUpload("Video")}
                      >
                        <Plus size={36} className="mb-2" />
                        <span className="font-medium text-sm md:text-base">
                          Add Video
                        </span>
                      </div>
                    </div>
                  )}
                  {videos.map((post) => (
                    <div
                      key={post._id}
                      className="aspect-square bg-zinc-800 overflow-hidden cursor-pointer"
                      style={{ borderRadius: "var(--radius-sm)" }}
                      onClick={() => handlePostClick(post)}
                    >
                      <video
                        src={post.mediaUrl}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        muted
                        loop
                        draggable={false}
                        onMouseOver={(e) => e.target.play()}
                        onMouseOut={(e) => e.target.pause()}
                      />
                    </div>
                  ))}
                </>
              ) : isOwnProfile ? (
                <div
                  className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed cursor-pointer transition-colors duration-200 w-full"
                  style={{
                    borderColor: isVideoUploadHovered ? "var(--primary-500)" : "var(--border-strong)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: isVideoUploadHovered ? "var(--surface-hover)" : "var(--surface-input)"
                  }}
                  onMouseEnter={() => setIsVideoUploadHovered(true)}
                  onMouseLeave={() => setIsVideoUploadHovered(false)}
                  onClick={() => handleTriggerUpload("Video")}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <Plus size={24} style={{ color: "var(--primary-500)" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    Share Videos
                  </h3>
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    You haven't uploaded any videos yet. Click here to share your first video!
                  </p>
                </div>
              ) : (
                <ProfileEmptyState
                  icon={VideoIcon}
                  title="No Videos Yet"
                  description={`${user.username} hasn't uploaded any videos yet.`}
                />
              )}
            </div>
          )}
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
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      </Motion.main>
    </>
  );
}
