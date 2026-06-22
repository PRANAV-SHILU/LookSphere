import { Sparkles } from "lucide-react";
import { socialFeatures } from "../../utils/staticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function WhyLookSphere() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Sparkles}
        title="Why LookSphere?"
        subtitle="Designed for creators, built for everyone. Here's what makes us different."
      />

        <div className="grid grid-cols-1 mdlg:grid-cols-3 gap-4 xsm:gap-6 sm:gap-8 max-w-6xl 3xl:max-w-7xl mx-auto">
          {socialFeatures.map((feature) => (
            <div
            key={feature.title}
            className={`liquid-glass p-6 sm:p-8 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg`}
            style={GLASS_SHADOW}
          >
            <CardGlow />
            <div className="relative">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-white/5"
                style={{ backgroundColor: "var(--surface-input)" }}
              >
                <div
                  className="transition-colors duration-300"
                  style={{ color: "var(--primary-500)" }}
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-(--text-primary)">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
