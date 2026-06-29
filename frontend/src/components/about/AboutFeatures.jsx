import { Sparkles } from "lucide-react";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { ABOUT_FEATURES } from "../../utils/aboutData";

export default function AboutFeatures() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Sparkles}
        title="What Makes Us Special"
        subtitle="Built with purpose, designed for people. Here's what sets LookSphere apart."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xsm:gap-6 max-w-6xl 3xl:max-w-7xl mx-auto">
        {ABOUT_FEATURES.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`liquid-glass p-6 sm:p-8 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg`}
              style={GLASS_SHADOW}
            >
              <CardGlow />
              <div className="relative">
                {/* Icon */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-5 flex items-center justify-center transition-transform duration-300 md:group-hover:scale-110 md:group-hover:rotate-3 border border-white/5"
                  style={{ backgroundColor: "var(--surface-input)" }}
                >
                  <FeatureIcon
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                    style={{ color: feature.color }}
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-(--text-primary)">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
