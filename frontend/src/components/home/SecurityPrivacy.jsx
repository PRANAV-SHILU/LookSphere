import { Shield, Layers } from "lucide-react";
import { securityFeatures } from "../../utils/HomeStaticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function SecurityPrivacy() {
  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Shield}
        title="Security & Privacy"
        subtitle="Zero-vulnerability audited stack, Your safety is our top priority. Here's how we protect your data at every layer."
      />

      <div className="grid grid-cols-1 gap-3 w-full mdlg:grid-cols-3">
        {securityFeatures.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <div
              key={feature.name}
              className={`${CARD_HOVER} glass flex flex-col p-5 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg group`}
              style={GLASS_SHADOW}
            >
              <CardGlow />
              <div className="gap-4 mb-5 flex items-center">
                <div
                  className="w-12 h-12 justify-center rounded-2xl border-2 border-transparent sm:w-16 sm:h-16 relative shrink-0 flex items-center transition-all duration-300 group-hover:scale-105 group-hover:border-(--primary-500)"
                  style={{ backgroundColor: "var(--surface-input)" }}
                >
                  <FeatureIcon
                    className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 group-hover:text-(--primary-600)"
                    style={{ color: "var(--primary-500)" }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-(--text-primary) relative sm:text-lg group-hover:text-(--primary-600) transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <span className="text-xs font-semibold text-(--primary-500) relative uppercase tracking-wide">
                    {feature.purpose}
                  </span>
                </div>
              </div>
              <p className="flex-1 mb-4 text-sm text-(--text-muted) relative leading-relaxed">
                {feature.description}
              </p>
              <div className="px-3 py-2 gap-2 rounded-lg text-xs text-(--text-muted) relative glass flex items-center">
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
