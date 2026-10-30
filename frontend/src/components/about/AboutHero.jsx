import {
  HeroBackground,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { ABOUT_HERO } from "../../utils/aboutData";

export default function AboutHero() {
  return (
    <div className="px-3 w-full max-w-4xl mx-auto relative 3xl:max-w-5xl 4xl:max-w-6xl xsm:px-4">
      <HeroBackground />
      <div
        className={`liquid-glass w-full text-center py-4 px-2 xsm:p-6 sm:p-10 md:p-12 3xl:p-16 4xl:p-20 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
      >
        <CardGlow />
        <div className="relative">
          {/* Badge */}
          <div className="px-3 py-1 mb-4 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-semibold shadow-sm inline-block xsm:mb-6 dark:text-blue-400 sm:text-sm tracking-wide uppercase">
            About Us
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-extrabold text-(--text-secondary) xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl xsm:mb-4 sm:mb-6 tracking-tight">
            The Story Behind{" "}
            <span className="hero-text drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
              LookSphere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs text-(--text-muted) max-w-2xl mx-auto font-medium xsm:text-sm sm:text-base md:text-lg lg:text-xl 3xl:text-2xl 4xl:text-3xl 3xl:max-w-3xl 4xl:max-w-4xl leading-relaxed">
            {ABOUT_HERO.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
