import { Layers } from "lucide-react";
import { howItWorks } from "../../utils/staticData";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function HowItWorks() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12 relative">
      <SectionHeading
        icon={Layers}
        title="How It Works"
        subtitle="Three simple steps to start your journey."
      />

      <div className="flex flex-col mdlg:flex-row justify-center items-stretch gap-4 xsm:gap-6 sm:gap-8 max-w-5xl 3xl:max-w-6xl mx-auto relative z-10">
        {howItWorks.map((step, index) => {
          return (
            <div
              key={step.title}
              className={`glass flex-1 p-6 sm:p-8 rounded-2xl relative ${CARD_HOVER_SUBTLE} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg`}
              style={GLASS_SHADOW}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-(--primary-500) text-white flex items-center justify-center font-bold text-xl shadow-lg rotate-12">
                {index + 1}
              </div>
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl mb-6 flex items-center justify-center border-2 border-white/10"
                style={{
                  backgroundColor: "var(--surface-input)",
                  color: "var(--primary-500)",
                }}
              >
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-(--text-primary)">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
