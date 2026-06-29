import {
  HeroBackground,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { ABOUT_HERO } from "../../utils/aboutData";

export default function AboutHero() {
  return (
    <div className="relative w-full max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto px-3 xsm:px-4">
      <HeroBackground />
      <div
        className={`liquid-glass w-full text-center p-4 xsm:p-6 sm:p-10 md:p-12 3xl:p-16 4xl:p-20 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
      >
        <CardGlow />
        <div className="relative">
          {/* Badge */}
          <div className="inline-block px-3 py-1 mb-4 xsm:mb-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm border border-blue-200 dark:border-blue-800">
            {ABOUT_HERO.badge}
          </div>

          {/* Title */}
          <h1 className="text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-extrabold mb-3 xsm:mb-4 sm:mb-6 tracking-tight text-(--text-secondary)">
            The Story Behind{" "}
            <span className="hero-text drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
              LookSphere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs xsm:text-sm sm:text-base md:text-lg lg:text-xl 3xl:text-2xl 4xl:text-3xl text-(--text-muted) max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto leading-relaxed font-medium">
            {ABOUT_HERO.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
