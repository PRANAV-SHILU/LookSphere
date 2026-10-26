import { useState } from "react";
import {
  Eye,
  Video,
  Image as ImageIcon,
  User,
  Sparkles,
  Repeat2,
  Bookmark,
  Link2,
  Check,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { fakePosts } from "../../utils/HomeStaticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function AppShowcase() {
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [postsState, setPostsState] = useState(() =>
    fakePosts.map((p) => ({
      ...p,
      sparked: p.isSparked,
      reshared: p.isReshared,
      archived: p.isArchived,
      sparksNum: parseInt(p.sparks.replace(/,/g, ""), 10) || 50,
      resharesNum: parseInt(p.reshares.replace(/,/g, ""), 10) || 10,
    }))
  );

  const toggleSpark = (id) => {
    setPostsState((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              sparked: !p.sparked,
              sparksNum: p.sparked ? p.sparksNum - 1 : p.sparksNum + 1,
            }
          : p
      )
    );
  };

  const toggleReshare = (id) => {
    setPostsState((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              reshared: !p.reshared,
              resharesNum: p.reshared ? p.resharesNum - 1 : p.resharesNum + 1,
            }
          : p
      )
    );
  };

  const toggleArchive = (id) => {
    setPostsState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, archived: !p.archived } : p))
    );
  };

  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Eye}
        title="Interactive Feed Showcase"
        subtitle="Experience live Sparks, Reshares, Archives, and zero-layout-shift media playback."
      />

      <div
        className="rounded-2xl overflow-hidden w-full shadow-2xl liquid-glass"
        style={GLASS_SHADOW}
      >
        {/* Browser Title Bar */}
        <div className="gap-2 px-4 py-3 border-b border-white/10 bg-(--surface-card)/50 flex items-center">
          <div className="gap-1.5 flex">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-4">
            <div
              className="px-3 py-1 rounded-md text-xs text-center max-w-xs mx-auto font-mono text-(--text-muted) border border-white/5 glass"
            >
              looksphere.app/feed
            </div>
          </div>
          <span className="px-2 py-0.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 hidden sm:inline">
            Live Interactive
          </span>
        </div>

        {/* Content Area — Interactive Post Grid */}
        <div className="grid grid-cols-1 p-3 gap-3 xsm:p-4 sm:p-6 sm:grid-cols-2">
          {postsState.map((post) => (
            <div
              key={post.id}
              className={`glass rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-xl ${
                post.hiddenOnMobile ? "hidden sm:flex" : ""
              }`}
            >
              {/* Author Info */}
              <div className="justify-between flex items-center">
                <div className="gap-2.5 flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full bg-linear-to-br ${post.avatarColors} flex items-center justify-center text-white font-bold text-xs shadow-xs`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-(--text-primary) block leading-tight">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-(--text-muted)">
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="gap-1 px-2 py-0.5 text-[11px] text-(--text-muted) bg-white/5 rounded-md border border-white/5 flex items-center">
                  <Eye size={12} className="text-(--primary-400)" />
                  <span>{post.impressions}</span>
                </div>
              </div>

              {/* Media Container with Zero Layout Shift Fixed Ratio */}
              <div
                className={`aspect-video rounded-lg bg-linear-to-br ${post.mediaColors} flex flex-col items-center justify-center border border-(--border-light) relative overflow-hidden group/media cursor-pointer`}
              >
                {post.mediaType === "Video" ? (
                  <>
                    <div className="mb-2 w-10 h-10 rounded-full bg-black/40 justify-center text-white shadow-lg backdrop-blur-xs flex items-center group-hover/media:scale-110 transition-transform">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="px-2 py-0.5 text-xs text-white/90 font-medium rounded bg-black/30 backdrop-blur-xs">
                      Single-Active Autoplay Video
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mb-2 w-10 h-10 rounded-full bg-black/40 justify-center text-white shadow-lg backdrop-blur-xs flex items-center group-hover/media:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="px-2 py-0.5 text-xs text-white/90 font-medium rounded bg-black/30 backdrop-blur-xs">
                      High-Resolution Photo
                    </span>
                  </>
                )}
              </div>

              {/* Caption */}
              <p className="text-xs text-(--text-secondary) leading-relaxed">
                {post.caption}
              </p>

              {/* Interactive Action Bar (Matching PostInteractions order & colors: Spark -> Reshare -> Share Link | Archive) */}
              <div className="pt-2 mt-auto border-t border-(--border-light) justify-between flex items-center">
                {/* Left actions: Spark, Reshare, Share (Copy Link) */}
                <div className="gap-1.5 flex items-center sm:gap-2">
                  {/* Spark Button (Yellow) */}
                  <button
                    onClick={() => toggleSpark(post.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      post.sparked
                        ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 shadow-[0_0_8px_rgba(250,204,21,0.25)]"
                        : "bg-transparent text-(--text-muted) hover:text-yellow-400 border-transparent hover:bg-white/5"
                    }`}
                    title="Spark this post"
                  >
                    <Sparkles
                      size={14}
                      fill={post.sparked ? "currentColor" : "none"}
                      className={post.sparked ? "text-yellow-400 scale-110" : ""}
                    />
                    <span>{post.sparksNum}</span>
                    <ChevronDown size={11} className="opacity-60" />
                  </button>

                  {/* Reshare Button (Blue) */}
                  <button
                    onClick={() => toggleReshare(post.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      post.reshared
                        ? "bg-blue-500/15 text-blue-400 border-blue-500/30 shadow-[0_0_8px_rgba(96,165,250,0.25)]"
                        : "bg-transparent text-(--text-muted) hover:text-blue-400 border-transparent hover:bg-white/5"
                    }`}
                    title="Reshare this post"
                  >
                    <Repeat2
                      size={14}
                      className={post.reshared ? "text-blue-400 scale-110" : ""}
                    />
                    <span>{post.resharesNum}</span>
                    <ChevronDown size={11} className="opacity-60" />
                  </button>

                  {/* Share Link Button */}
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(`https://looksphere.app/feed`);
                      }
                      setCopiedPostId(post.id);
                      toast.success("Link copied to clipboard!");
                      setTimeout(() => setCopiedPostId(null), 2500);
                    }}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer border border-transparent ${
                      copiedPostId === post.id
                        ? "text-green-500 bg-green-500/15"
                        : "text-(--text-muted) hover:text-blue-400 hover:bg-white/5"
                    }`}
                    title="Copy post link"
                  >
                    {copiedPostId === post.id ? <Check size={14} className="text-green-500 scale-110" /> : <Link2 size={14} />}
                  </button>
                </div>

                {/* Right actions: Archive (Emerald) */}
                <div className="gap-1 flex items-center">
                  <button
                    onClick={() => toggleArchive(post.id)}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer border border-transparent ${
                      post.archived
                        ? "text-emerald-400 bg-emerald-500/15"
                        : "text-(--text-muted) hover:text-emerald-400 hover:bg-white/5"
                    }`}
                    title="Archive privately"
                  >
                    <Bookmark
                      size={14}
                      fill={post.archived ? "currentColor" : "none"}
                      className={post.archived ? "text-emerald-400 scale-110" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
