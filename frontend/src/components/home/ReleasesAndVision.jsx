import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { releasesAndVisionData } from "../../utils/staticData";

export default function ReleasesAndVision() {

  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Sparkles}
        title="Releases & Vision"
        subtitle="Stay in the loop with LookSphere's latest releases, future milestones, and our mission."
      />

      <div className="grid grid-cols-1 mdlg:grid-cols-3 gap-4 xsm:gap-6 sm:gap-8 max-w-6xl 3xl:max-w-7xl mx-auto">
        {releasesAndVisionData.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className={`liquid-glass p-6 sm:p-8 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg block group relative overflow-hidden`}
              style={{ ...GLASS_SHADOW, textDecoration: "none" }}
            >
              <CardGlow />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-white/5"
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <span 
                      className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-md border"
                      style={{ 
                        borderColor: `${card.color}30`, 
                        color: card.color,
                        backgroundColor: `${card.color}10`
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-(--text-primary)">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                <div 
                  className="flex items-center gap-1.5 text-sm font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--primary-500)" }}
                >
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
