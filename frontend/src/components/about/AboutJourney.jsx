import { MapPin } from "lucide-react";
import { CARD_HOVER, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { ABOUT_JOURNEY } from "../../utils/aboutData";

export default function AboutJourney() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={MapPin}
        title="The Journey"
        subtitle="From a simple auth app to a full social media platform — here's how LookSphere evolved."
      />

      <div className="max-w-4xl 3xl:max-w-5xl mx-auto relative">
        {/* Vertical timeline line — desktop only */}
        <div
          className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
          style={{ backgroundColor: "var(--border-normal)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-6 xsm:gap-8">
          {ABOUT_JOURNEY.map((milestone) => (
            <div
              key={milestone.step}
              className={`${CARD_HOVER} liquid-glass rounded-2xl p-5 xsm:p-6 sm:p-8 md:pl-20 relative`}
              style={GLASS_SHADOW}
            >
              <CardGlow />

              {/* Step number — timeline dot on desktop */}
              <div
                className={`relative md:absolute md:left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm sm:text-base shadow-lg mb-4 md:mb-0 md:top-6 bg-linear-to-br ${milestone.accent}`}
              >
                {milestone.step}
              </div>

              <div className="relative">
                {/* Period badge */}
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg mb-2 inline-block"
                  style={{
                    backgroundColor: "var(--surface-input)",
                    color: "var(--primary-500)",
                  }}
                >
                  {milestone.period}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-(--text-primary) mb-2">
                  {milestone.title}
                </h3>

                <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
