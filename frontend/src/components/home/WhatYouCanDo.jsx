import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Rocket, Check } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { capabilities } from "../../utils/staticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "./Shared";

export default function WhatYouCanDo() {
  const [activeCapability, setActiveCapability] = useState(0);

  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Rocket}
        title="What You Can Do"
        subtitle="Explore the powerful features that make LookSphere your creative home."
      />

      {/* Tab buttons */}
      <Motion.div
        className="tab-container mx-auto mb-10 flex-wrap"
        style={{ padding: "5px" }}
        {...HomeAnimation.tabContainer}
      >
        {capabilities.map((cap, i) => {
          const TabIcon = cap.icon;
          return (
            <button
              key={cap.id}
              onClick={() => setActiveCapability(i)}
              className={`tab-btn flex items-center gap-2 py-2.5 px-5 text-sm sm:text-base cursor-pointer border-none bg-transparent ${
                activeCapability === i ? "active" : ""
              }`}
            >
              <TabIcon size={18} /> {cap.label}
            </button>
          );
        })}
      </Motion.div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <Motion.div
            key={capabilities[activeCapability].id}
            className="liquid-glass rounded-2xl p-6 sm:p-8 md:p-10"
            style={GLASS_SHADOW}
            {...HomeAnimation.tabContent}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl mb-4 border-2 border-(--primary-500)"
                  style={{ backgroundColor: "var(--surface-input)" }}
                >
                  {(() => {
                    const CapIcon = capabilities[activeCapability].icon;
                    return (
                      <CapIcon
                        className="w-7 h-7"
                        style={{ color: "var(--primary-500)" }}
                      />
                    );
                  })()}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-(--text-primary)">
                  {capabilities[activeCapability].title}
                </h3>
                <p className="text-base sm:text-lg text-(--text-muted) mb-6 leading-relaxed">
                  {capabilities[activeCapability].description}
                </p>
              </div>
              <div className="w-full md:w-auto md:min-w-[240px]">
                <ul className="flex flex-col gap-3">
                  {capabilities[activeCapability].features.map((feature, fi) => (
                    <Motion.li
                      key={feature}
                      className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm sm:text-base text-(--text-secondary)"
                      style={GLASS_SHADOW}
                      {...HomeAnimation.featureItem}
                      transition={{ delay: fi * 0.08 }}
                    >
                      <Check
                        size={16}
                        className="shrink-0"
                        style={{ color: "var(--status-success)" }}
                      />
                      {feature}
                    </Motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
