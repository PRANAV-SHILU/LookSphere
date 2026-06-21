import { useState } from "react";
import { Rocket, Check } from "lucide-react";
import { capabilities } from "../../utils/staticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function WhatYouCanDo() {
  const [activeCapability, setActiveCapability] = useState(0);

  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Rocket}
        title="What You Can Do"
        subtitle="Explore the powerful features that make LookSphere your creative home."
      />

      {/* Tab buttons */}
      <div
        className="tab-container mx-auto mb-10 flex-wrap"
        style={{ padding: "5px" }}
      >
        {capabilities.map((cap, i) => {
          const TabIcon = cap.icon;
          return (
            <button
              key={cap.id}
              onClick={() => setActiveCapability(i)}
              className={`tab-btn flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 xsm:px-3 sm:px-5 text-[11px] xsm:text-xs sm:text-base cursor-pointer border-none bg-transparent ${
                activeCapability === i ? "active" : ""
              }`}
            >
              <TabIcon size={18} /> {cap.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="max-w-4xl 3xl:max-w-5xl mx-auto">
        <div
          key={capabilities[activeCapability].id}
          className="liquid-glass rounded-2xl p-6 sm:p-8 md:p-10"
          style={GLASS_SHADOW}
        >
            <div className="flex flex-col mdlg:flex-row mdlg:gap-8 items-center mdlg:items-start">
              <div className="flex-1 flex flex-col items-center mdlg:items-start text-center mdlg:text-left">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl mb-4 border-2 border-(--primary-500) shrink-0"
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
              <div className="w-full mdlg:w-auto mdlg:min-w-[240px]">
                <ul className="flex flex-row flex-wrap justify-center mdlg:flex-col mdlg:justify-start gap-2 xsm:gap-3">
                  {capabilities[activeCapability].features.map(
                    (feature) => (
                      <li
                        key={feature}
                        className="glass flex items-center gap-1.5 xsm:gap-2 sm:gap-3 rounded-xl px-2.5 py-1.5 xsm:px-3 xsm:py-2 sm:px-4 sm:py-3 text-[11px] xsm:text-xs sm:text-sm mdlg:text-base text-(--text-secondary) transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-(--primary-500)/10 hover:text-(--primary-600) cursor-default group"
                        style={GLASS_SHADOW}
                      >
                        <Check
                          size={16}
                          className="shrink-0 transition-transform duration-300 group-hover:scale-125"
                          style={{ color: "var(--status-success)" }}
                        />
                        {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
