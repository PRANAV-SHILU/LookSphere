import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WHATS_NEW_DATA } from "../utils/whatsNewData";
import { CardGlow } from "../shared-components/SharedHomeComponents";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";
import { Star, Wrench, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const GLASS_SHADOW = {
  boxShadow:
    "inset 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 -1px 1px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.3)",
};

const getTagIcon = (tag) => {
  switch (tag) {
    case "Feature":
      return <Star size={16} className="text-yellow-400" />;
    case "Bugfix":
      return <Wrench size={16} className="text-red-400" />;
    case "Enhancement":
      return <Sparkles size={16} className="text-green-400" />;
    default:
      return <CheckCircle size={16} className="text-blue-400" />;
  }
};

const getTagColor = (tag) => {
  switch (tag) {
    case "Feature":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "Bugfix":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "Enhancement":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    default:
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }
};

export default function WhatsNew() {
  useDocumentMetadata("What's New");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen py-16 md:py-24 animate-in fade-in duration-500 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      {/* Back Button */}
      <div className="mb-6 md:mb-10 w-full flex justify-start">
        <BackButton />
      </div>

      {/* Header Section */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--primary-400) to-(--primary-600) drop-shadow-sm">
            What's New
          </span>
        </h1>
        <p className="text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto font-medium">
          Stay up to date with the latest features, improvements, and bug fixes on LookSphere.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l-2 border-(--border-light) ml-4 md:ml-8 pb-12 space-y-16">
        {WHATS_NEW_DATA.map((release) => (
          <div key={release.id} className="relative pl-5 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-(--primary-500) border-4 border-(--background) shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />

            {/* Release Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">
                {release.title}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="inline-flex justify-center items-center shrink-0 min-w-[115px] text-sm font-semibold text-(--primary-400) bg-(--primary-500)/10 px-3 py-1 rounded-full border border-(--primary-500)/20">
                  {release.date}
                </span>
                <span className="text-sm text-(--text-muted)">
                  {release.description}
                </span>
              </div>
            </div>

            {/* Release Updates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {release.updates.map((update, uIdx) => (
                <div
                  key={uIdx}
                  className="liquid-glass rounded-3xl py-5 px-4 md:p-8 relative overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-2xl group flex flex-col h-full"
                  style={GLASS_SHADOW}
                >
                  <CardGlow />
                  
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getTagColor(update.tag)}`}>
                      {getTagIcon(update.tag)}
                      <span className="text-xs font-bold uppercase tracking-wider">{update.tag}</span>
                    </div>
                  </div>

                  <div className="relative z-10 grow">
                    <h3 className="text-xl font-bold text-(--text-primary) mb-3">
                      {update.title}
                    </h3>
                    <p className="text-(--text-secondary) text-sm sm:text-base leading-relaxed mb-6">
                      {update.description}
                    </p>
                  </div>

                  {update.link && (
                    <div className="relative z-10 mt-auto pt-4 border-t border-(--border-light)">
                      <Link
                        to={update.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary-400) hover:text-(--primary-300) transition-colors group/link"
                      >
                        Explore Feature
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  )}

                  {update.scrollToFooter && (
                    <div className="relative z-10 mt-auto pt-4 border-t border-(--border-light)">
                      <button
                        onClick={() => {
                          window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "smooth",
                          });
                        }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary-400) hover:text-(--primary-300) transition-colors group/link cursor-pointer"
                      >
                        View Footer
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1 rotate-90" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
