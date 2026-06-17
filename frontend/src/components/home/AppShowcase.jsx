import { motion as Motion } from "framer-motion";
import { Eye, Video, Image as ImageIcon, User } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { fakePosts } from "../../utils/staticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "./Shared";

export default function AppShowcase() {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Eye}
        title="Beautiful by Design"
        subtitle="A clean, modern interface that looks stunning on every device."
      />

      <Motion.div
        className="liquid-glass rounded-2xl overflow-hidden max-w-4xl mx-auto"
        style={GLASS_SHADOW}
        {...HomeAnimation.showcaseApp}
      >
        {/* Browser Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-4">
            <div
              className="glass rounded-md px-3 py-1.5 text-xs text-center max-w-xs mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              looksphere/feed
            </div>
          </div>
        </div>

        {/* Content Area — Fake Post Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fakePosts.map((post) => (
            <Motion.div
              key={post.id}
              className={`glass rounded-xl p-4 flex flex-col gap-3 cursor-grab active:cursor-grabbing ${
                post.hiddenOnMobile ? "hidden sm:flex" : ""
              }`}
              whileHover={{ scale: 1.02, rotate: post.rotation }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
            >
              {/* Author Info */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full bg-linear-to-br ${post.avatarColors} flex items-center justify-center text-white`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-(--text-primary)">
                  {post.author}
                </span>
              </div>

              {/* Media */}
              <div
                className={`aspect-video rounded-lg bg-linear-to-br ${post.mediaColors} flex flex-col items-center justify-center border border-(--border-light)`}
              >
                {post.mediaType === "Video" ? (
                  <Video
                    className="w-8 h-8 mb-2"
                    style={{ color: "var(--text-muted)", opacity: 0.5 }}
                  />
                ) : (
                  <ImageIcon
                    className="w-8 h-8 mb-2"
                    style={{ color: "var(--text-muted)", opacity: 0.5 }}
                  />
                )}
                <span className="text-xs text-(--text-muted) font-medium">
                  {post.mediaType}
                </span>
              </div>

              {/* Caption / Footer */}
              <div className="bg-(--surface-card) p-3 rounded-lg border border-(--border-light) shadow-xs mt-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-1 text-xs text-(--text-muted) font-medium">
                    <Eye size={14} /> {post.views} views
                  </span>
                  <span className="text-[10px] text-(--text-muted)">
                    {post.date}
                  </span>
                </div>
                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
}
