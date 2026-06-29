import { useEffect } from "react";
import { ROADMAP_CATEGORIES } from "../utils/roadmapData";
import { GLASS_SHADOW } from "../utils/styles";
import { HeroBackground, CardGlow } from "../shared-components/SharedHomeComponents";

export default function Roadmap() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen pt-20 pb-16 xsm:pt-24 xsm:pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 xsm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block px-3 py-1 mb-4 xsm:mb-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm border border-blue-200 dark:border-blue-800">
            Roadmap
          </div>
          <h1 className="text-3xl xsm:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-(--text-primary)">
            What's Coming <span className="hero-text drop-shadow-md">Next</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            LookSphere is continuously evolving. Explore our future plans, upcoming features, and core infrastructure improvements.
          </p>
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
