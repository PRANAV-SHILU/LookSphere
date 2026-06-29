import { User, Quote, Mail } from "lucide-react";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { GithubIcon, LinkedinIcon } from "../../shared-components/SvgIcons";
import { ABOUT_DEVELOPER } from "../../utils/aboutData";

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

export default function AboutDeveloper() {
  return (
    <div className="w-full py-10 xsm:py-12 sm:py-16 md:py-20 3xl:py-24 px-3 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={User}
        title="Meet the Developer"
        subtitle="The person behind every line of code in LookSphere."
      />

      <div className="max-w-3xl 3xl:max-w-4xl mx-auto">
        <div
          className={`liquid-glass rounded-2xl p-6 xsm:p-8 sm:p-10 ${CARD_HOVER_SUBTLE}`}
          style={GLASS_SHADOW}
        >
          <CardGlow />
          <div className="relative flex flex-col items-center text-center gap-5 xsm:gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-(--primary-500) to-purple-500 flex items-center justify-center text-white shadow-xl shadow-(--primary-500)/25">
              <span className="text-2xl sm:text-3xl font-extrabold">
                {ABOUT_DEVELOPER.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-(--text-primary) mb-1">
                {ABOUT_DEVELOPER.name}
              </h3>
              <span
                className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
                style={{ color: "var(--primary-500)" }}
              >
                {ABOUT_DEVELOPER.role}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-(--text-muted) leading-relaxed max-w-xl">
              {ABOUT_DEVELOPER.bio}
            </p>

            {/* Quote */}
            <div
              className="glass rounded-xl px-5 py-4 max-w-lg flex items-start gap-3"
              style={GLASS_SHADOW}
            >
              <Quote
                size={20}
                className="shrink-0 mt-0.5"
                style={{ color: "var(--primary-500)" }}
              />
              <p className="text-sm sm:text-base italic text-(--text-secondary) leading-relaxed">
                "{ABOUT_DEVELOPER.quote}"
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {ABOUT_DEVELOPER.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] || Mail;
                const isExternal = !social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-md group"
                    style={{
                      backgroundColor: "var(--surface-input)",
                      borderColor: "var(--border-normal)",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                    }}
                  >
                    <Icon
                      size={16}
                      className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
                    />
                    <span className="text-sm font-medium transition-colors duration-200 group-hover:text-(--primary-500)">
                      {social.display}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
