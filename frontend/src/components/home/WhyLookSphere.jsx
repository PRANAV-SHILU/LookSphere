import { Sparkles } from "lucide-react";
import { socialFeatures } from "../../utils/HomeStaticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function WhyLookSphere() {
  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Sparkles}
        title="Why LookSphere?"
        subtitle="Designed for creators, built for everyone, Next-gen post interactions, a dedicated support desk, Here's what makes us different."
      />

      <div className="grid grid-cols-1 gap-2 w-full lg:gap-3 sm:grid-cols-2">
        {socialFeatures.map((feature) => (
          <div
            key={feature.title}
            className={`liquid-glass p-5 rounded-2xl ${CARD_HOVER} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg flex flex-col justify-between`}
            style={GLASS_SHADOW}
          >
            <CardGlow />
            <div className="relative">
              <div
                className="mb-3 w-12 h-12 rounded-2xl justify-center border border-white/5 lg:mb-6 sm:w-16 sm:h-16 flex items-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: "var(--surface-input)" }}
              >
                <div
                  className="transition-colors duration-300"
                  style={{ color: "var(--primary-500)" }}
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-(--text-primary) sm: sm:text-xl lg:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-(--text-muted) sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
