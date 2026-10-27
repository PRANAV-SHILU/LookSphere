import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { supportAndPoliciesData } from "../../utils/HomeStaticData";

export default function SupportAndPolicies() {
  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={HelpCircle}
        title="Support & Policies"
        subtitle="Direct support tickets, live inquiry tracking, helpful guides, and data safety policies."
      />

      <div className="grid grid-cols-1 gap-2 w-full lg:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {supportAndPoliciesData.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className={`liquid-glass p-5 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg block group relative overflow-hidden`}
              style={{ ...GLASS_SHADOW, textDecoration: "none" }}
            >
              <CardGlow />
              <div className="flex-col z-10 h-full justify-between relative flex">
                <div>
                  <div className="mb-3 justify-between sm:mb-6 flex items-start">
                    <div
                      className="w-12 h-12 rounded-2xl justify-center border border-white/5 sm:w-16 sm:h-16 flex items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <span 
                      className="px-2.5 py-1 text-[10px] font-extrabold rounded-md border uppercase tracking-wider transition-all duration-300 group-hover:bg-opacity-20"
                      style={{ 
                        borderColor: `${card.color}40`, 
                        color: card.color,
                        backgroundColor: `${card.color}18`
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-(--text-primary) sm:mb-3 sm:text-xl">
                    {card.title}
                  </h3>
                  <p className="mb-4 text-sm text-(--text-muted) sm:mb-6 sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div 
                  className="gap-1.5 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--primary-500)" }}
                >
                  <span>{card.actionText || card.title}</span>
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
