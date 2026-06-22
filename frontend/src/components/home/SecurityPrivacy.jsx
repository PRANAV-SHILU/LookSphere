import { Shield, Layers } from "lucide-react";
import { securityFeatures } from "../../utils/staticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function SecurityPrivacy() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Shield}
        title="Security & Privacy"
        subtitle="Your safety is our top priority. Here's how we protect your data at every layer."
      />

      <div className="grid grid-cols-1 mdlg:grid-cols-2 gap-4 xsm:gap-6 lg:gap-8 max-w-[1000px] mx-auto 3xl:max-w-7xl 3xl:gap-10 mt-8 xsm:mt-12 3xl:mt-16 w-full px-2 sm:px-4">
        {securityFeatures.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <div
              key={feature.name}
              className={`${CARD_HOVER} glass flex flex-col p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg group`}
              style={GLASS_SHADOW}
            >
              <CardGlow />
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="relative shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-(--primary-500)"
                  style={{ backgroundColor: "var(--surface-input)" }}
                >
                  <FeatureIcon
                    size={20}
                    className="transition-colors duration-300 group-hover:text-(--primary-600)"
                    style={{ color: "var(--primary-500)" }}
                  />
                </div>
                <div>
                  <h3 className="relative text-base sm:text-lg font-bold text-(--text-primary) group-hover:text-(--primary-600) transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <span className="relative text-xs font-semibold text-(--primary-500) uppercase tracking-wide">
                    {feature.purpose}
                  </span>
                </div>
              </div>
              <p className="relative text-sm text-(--text-muted) mb-4 leading-relaxed flex-1">
                {feature.description}
              </p>
              <div className="relative glass rounded-lg px-3 py-2 text-xs text-(--text-muted) flex items-center gap-2">
                <Layers size={12} style={{ color: "var(--primary-500)" }} />
                {feature.where}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
