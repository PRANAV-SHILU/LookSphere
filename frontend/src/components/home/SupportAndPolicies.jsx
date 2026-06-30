import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { supportAndPoliciesData } from "../../utils/staticData";

export default function SupportAndPolicies() {

  return (
    <div className="w-full pb-10 xsm:pb-12 sm:pb-16 md:py-20 3xl:py-24 pt-0 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={HelpCircle}
        title="Support & Policies"
        subtitle="Browse our helpful guides, user agreements, and data safety policies."
      />

      <div className="grid grid-cols-1 mdlg:grid-cols-3 gap-4 xsm:gap-6 sm:gap-8 max-w-6xl 3xl:max-w-7xl mx-auto">
        {supportAndPoliciesData.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className={`liquid-glass p-6 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg block group relative overflow-hidden`}
              style={{ ...GLASS_SHADOW, textDecoration: "none" }}
            >
              <CardGlow />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-white/5"
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span 
                      className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full border transition-all duration-300 group-hover:bg-opacity-20"
                      style={{ 
                        borderColor: `${card.color}40`, 
                        color: card.color,
                        backgroundColor: `${card.color}18`
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-(--text-primary)">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-(--text-muted) leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>
                <div 
                  className="flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--primary-500)" }}
                >
                  <span>Read page</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
