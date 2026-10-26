import { useState } from "react";
import { Link } from "react-router-dom";
import { Rocket, Check, ArrowRight } from "lucide-react";
import { capabilities } from "../../utils/HomeStaticData";
import { GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

const CAPABILITY_LINKS = {
  post: { to: "/feed", label: "Browse Feed" },
  interactions: { to: "/feed", label: "Experience Sparks & Reshares" },
  explore: { to: "/explore", label: "Explore Global Creators" },
  support: { to: "/contact-us", label: "Submit Support Ticket" },
};

export default function WhatYouCanDo() {
  const [activeCapability, setActiveCapability] = useState(0);
  const currentCap = capabilities[activeCapability];
  const currentLink = CAPABILITY_LINKS[currentCap.id];

  return (
    <div className="py-10 px-3 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={Rocket}
        title="What You Can Do"
        subtitle="Explore the powerful features and interactions that make LookSphere your creative home."
      />

      {/* Tab buttons */}
      <div
        className="flex-wrap mb-10 mx-auto tab-container"
        style={{ padding: "5px" }}
      >
        {capabilities.map((cap, i) => {
          const TabIcon = cap.icon;
          return (
            <button
              key={cap.id}
              onClick={() => setActiveCapability(i)}
              className={`tab-btn flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2.5 xsm:px-3 sm:px-5 text-[11px] xsm:text-xs sm:text-base cursor-pointer border-none bg-transparent ${
                activeCapability === i ? "active" : ""
              }`}
            >
              <TabIcon size={18} /> {cap.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="w-full">
        <div
          key={currentCap.id}
          className="p-6 rounded-2xl liquid-glass transition-all duration-300"
          style={GLASS_SHADOW}
        >
          <div className="flex-col flex mdlg:flex-row mdlg:gap-8 items-center mdlg:items-start">
            <div className="flex-1 flex-col text-center flex items-center mdlg:items-start mdlg:text-left">
              <div
                className="mb-4 w-14 h-14 justify-center rounded-xl border-2 border-(--primary-500) flex items-center shrink-0"
                style={{ backgroundColor: "var(--surface-input)" }}
              >
                {(() => {
                  const CapIcon = currentCap.icon;
                  return (
                    <CapIcon
                      className="w-7 h-7"
                      style={{ color: "var(--primary-500)" }}
                    />
                  );
                })()}
              </div>
              <h3 className="mb-3 text-2xl font-bold text-(--text-primary) sm:text-3xl">
                {currentCap.title}
              </h3>
              <p className="mb-6 text-base text-(--text-muted) sm:text-lg leading-relaxed">
                {currentCap.description}
              </p>
              {currentLink && (
                <Link
                  to={currentLink.to}
                  className="gap-2 px-4 py-2.5 mb-6 rounded-xl bg-(--primary-500)/10 text-(--primary-400) border border-(--primary-500)/25 font-semibold text-sm shadow-xs inline-flex items-center hover:bg-(--primary-500)/20 transition-all group/btn cursor-pointer no-underline mdlg:mb-0"
                >
                  <span>{currentLink.label}</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
            <div className="w-full mdlg:w-auto mdlg:min-w-64">
              <ul className="flex-row flex-wrap gap-2 justify-center flex mdlg:flex-col mdlg:justify-start xsm:gap-3">
                {currentCap.features.map((feature) => (
                  <li
                    key={feature}
                    className="gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] text-(--text-secondary) glass flex items-center xsm:gap-2 sm:gap-3 xsm:px-3 xsm:py-2 sm:px-4 sm:py-3 xsm:text-xs sm:text-sm mdlg:text-base transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-(--primary-500)/10 md:hover:text-(--primary-600) cursor-default group"
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
