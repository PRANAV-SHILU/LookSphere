import { useEffect } from "react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { ROADMAP_CATEGORIES, COMPLETED_FEATURES, LAST_UPDATED } from "../utils/roadmapData";
import { GLASS_SHADOW } from "../utils/styles";
import { HeroBackground, CardGlow } from "../shared-components/SharedHomeComponents";
import BackButton from "../shared-components/BackButton";

export default function Roadmap() {
  useDocumentMetadata("Roadmap", "Explore the development roadmap for LookSphere. See upcoming features and the future vision for the platform being built by developer Pranav Shilu.");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen pt-8 pb-16 xsm:pt-10 xsm:pb-20 md:pt-12 md:pb-24 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xsm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between mb-6 md:mb-10">
          <BackButton />
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Roadmap
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-12 md:mb-18 flex flex-col items-center">
          <h1 className="text-3xl xsm:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-(--text-primary)">
            What's Coming <span className="hero-text drop-shadow-md">Next</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            LookSphere is continuously evolving. Explore our future plans, upcoming features, and core infrastructure improvements.
          </p>
          <p className="text-[10px] sm:text-xs font-semibold mt-6 uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Last Updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Completed Section (Full Width) */}
        <div className="mb-12 md:mb-16">
          <div
            className={`liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-2xl group border-2`}
            style={{ ...GLASS_SHADOW, borderColor: `${COMPLETED_FEATURES.color}30` }}
          >
            <CardGlow />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 md:group-hover:scale-110 md:group-hover:rotate-3 shadow-lg"
                style={{ backgroundColor: `${COMPLETED_FEATURES.color}20`, border: `1px solid ${COMPLETED_FEATURES.color}40` }}
              >
                <COMPLETED_FEATURES.icon size={24} color={COMPLETED_FEATURES.color} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
                {COMPLETED_FEATURES.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              {COMPLETED_FEATURES.items.map((item, index) => (
                <div key={index} className="group/item flex items-start gap-4 p-4 rounded-2xl bg-(--surface-card) border border-(--border-light) transition-colors duration-300 md:hover:border-(--primary-500) md:hover:bg-(--surface-hover)">
                  <div className="w-10 h-10 rounded-xl bg-(--surface-input) flex shrink-0 items-center justify-center border border-(--border-normal) transition-all duration-300 md:group-hover/item:scale-110 md:group-hover/item:border-(--primary-500) md:group-hover/item:shadow-[0_4px_12px_rgba(59,130,246,0.15)]">
                    <item.icon size={18} className="text-(--text-muted) transition-colors duration-300 md:group-hover/item:text-(--primary-500)" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-(--text-primary) mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {ROADMAP_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-2xl group`}
              style={GLASS_SHADOW}
            >
              <CardGlow />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 md:group-hover:scale-110 md:group-hover:rotate-3 shadow-lg"
                  style={{ backgroundColor: `${category.color}20`, border: `1px solid ${category.color}40` }}
                >
                  <category.icon size={24} color={category.color} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-(--text-primary)">
                  {category.title}
                </h2>
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                {category.items.map((item, index) => (
                  <div key={index} className="group/item flex items-start gap-4 p-4 rounded-2xl bg-(--surface-card) border border-(--border-light) transition-colors duration-300 md:hover:border-(--primary-500) md:hover:bg-(--surface-hover)">
                    <div className="w-10 h-10 rounded-xl bg-(--surface-input) flex shrink-0 items-center justify-center border border-(--border-normal) transition-all duration-300 md:group-hover/item:scale-110 md:group-hover/item:border-(--primary-500) md:group-hover/item:shadow-[0_4px_12px_rgba(59,130,246,0.15)]">
                      <item.icon size={18} className="text-(--text-muted) transition-colors duration-300 md:group-hover/item:text-(--primary-500)" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-(--text-primary) mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
