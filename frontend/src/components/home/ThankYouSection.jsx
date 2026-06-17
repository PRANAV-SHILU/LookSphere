import { motion as Motion } from "framer-motion";
import { Heart } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { AnimatedText } from "./Shared";

export default function ThankYouSection() {
  return (
    <div className="w-full pb-10 sm:pb-16 px-4 mt-8">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <Motion.div
          {...HomeAnimation.heartPulse}
          className="text-red-500 mb-2"
        >
          <Heart size={28} className="fill-current" />
        </Motion.div>
        
        <AnimatedText
          text="Thank you for visiting! We hope you enjoy exploring LookSphere."
          className="text-sm sm:text-base text-(--text-muted) italic max-w-xl mx-auto mb-2"
          delay={0}
          stagger={0.015}
          yOffset={10}
        />
        
        <AnimatedText
          text="Built with passion for seamless and secure experiences."
          className="text-sm sm:text-base text-(--text-muted) italic max-w-xl mx-auto"
          delay={0.2}
          stagger={0.015}
          yOffset={10}
        />

        <AnimatedText
          text={`© ${new Date().getFullYear()} LookSphere. All rights reserved.`}
          className="text-xs sm:text-sm text-(--text-secondary) mt-4"
          delay={0.4}
          stagger={0.015}
          yOffset={10}
        />
      </div>
    </div>
  );
}
