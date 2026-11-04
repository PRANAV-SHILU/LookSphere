import { Layers } from "lucide-react";
import { howItWorks } from "../../utils/HomeStaticData";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "../../shared-components/SharedHomeComponents";

export default function HowItWorks() {
  return (
    <div className="py-10 px-2 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12 relative">
      <SectionHeading
        icon={Layers}
        title="How It Works"
        subtitle="Three intuitive steps to create, engage with Sparks and Reshares, and build your community."
      />

      <div className="flex-col gap-3 justify-center w-full z-10 flex mdlg:flex-row items-stretch relative">
        {howItWorks.map((step, index) => {
          return (
            <div
              key={step.title}
              className={`glass flex-1 py-5 px-4 xsm:px-5 rounded-2xl relative ${CARD_HOVER_SUBTLE} transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg`}
              style={GLASS_SHADOW}
            >
              <div className="w-12 h-12 rounded-xl bg-(--primary-500) text-white justify-center font-bold text-xl shadow-lg absolute -top-4 -right-4 flex items-center rotate-12">
                {index + 1}
              </div>
              <div
                className="mb-4 w-14 h-14 rounded-xl justify-center border-2 border-white/10 lg:mb-6 sm:w-16 sm:h-16 flex items-center"
                style={{
                  backgroundColor: "var(--surface-input)",
                  color: "var(--primary-500)",
                }}
              >
                {step.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-(--text-primary) sm:text-xl lg:mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-(--text-muted) sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
