import { motion as Motion } from "framer-motion";
import { Layers } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { howItWorks } from "../../utils/staticData";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { SectionHeading } from "./Shared";

export default function HowItWorks() {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 relative">
      <SectionHeading
        icon={Layers}
        title="How It Works"
        subtitle="Three simple steps to start your journey."
      />

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 sm:gap-8 max-w-5xl mx-auto relative z-10">
        {howItWorks.map((step, index) => {
          return (
            <Motion.div
              key={step.title}
              className={`glass flex-1 p-6 sm:p-8 rounded-2xl relative ${CARD_HOVER_SUBTLE}`}
              style={GLASS_SHADOW}
              {...HomeAnimation.stepCard}
              transition={{ delay: index * 0.15 }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-(--primary-500) text-white flex items-center justify-center font-bold text-xl shadow-lg rotate-12">
                {index + 1}
              </div>
              <Motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl mb-6 flex items-center justify-center border-2 border-white/10"
                style={{ backgroundColor: "var(--surface-input)", color: "var(--primary-500)" }}
                {...HomeAnimation.stepIcon}
              >
                {step.icon}
              </Motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-(--text-primary)">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
                {step.description}
              </p>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}
