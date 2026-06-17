import { motion as Motion } from "framer-motion";
import { Shield, Layers } from "lucide-react";
import { securityFeatures } from "../../utils/staticData";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading, CardGlow } from "./Shared";

export default function SecurityPrivacy() {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Shield}
        title="Security & Privacy"
        subtitle="Your safety is our top priority. Here's how we protect your data at every layer."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {securityFeatures.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <Motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`${CARD_HOVER} glass flex flex-col p-6 rounded-2xl`}
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
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}
