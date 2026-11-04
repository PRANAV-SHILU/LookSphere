import { User, Quote, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import {
  SectionHeading,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { GithubIcon, LinkedinIcon } from "../../shared-components/shared-components";
import { ABOUT_DEVELOPER } from "../../utils/aboutData";

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
  Contact: MessageSquare,
};

export default function AboutDeveloper() {
  return (
    <div className="py-10 px-2 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12">
      <SectionHeading
        icon={User}
        title="Meet the Developer"
        subtitle="The person behind every line of code in LookSphere."
      />

      <div className="max-w-3xl mx-auto 3xl:max-w-4xl">
        <div
          className={`liquid-glass rounded-2xl py-6 px-4 xsm:p-8 sm:p-10 ${CARD_HOVER_SUBTLE}`}
          style={GLASS_SHADOW}
        >
          <CardGlow />
          <div className="flex-col gap-5 text-center relative flex items-center xsm:gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-linear-to-br justify-center text-white shadow-xl shadow-(--primary-500)/25 sm:w-24 sm:h-24 from-(--primary-500) to-purple-500 flex items-center">
              <span className="text-2xl font-extrabold sm:text-3xl">
                {ABOUT_DEVELOPER.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="mb-1 text-xl font-extrabold text-(--text-primary) sm:text-2xl">
                {ABOUT_DEVELOPER.name}
              </h3>
              <span
                className="text-xs font-semibold sm:text-sm uppercase tracking-wider"
                style={{ color: "var(--primary-500)" }}
              >
                {ABOUT_DEVELOPER.role}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-(--text-muted) max-w-xl sm:text-base leading-relaxed">
              {ABOUT_DEVELOPER.bio}
            </p>

            {/* Quote */}
            <div
              className="px-5 py-4 gap-3 rounded-xl max-w-lg glass flex items-start"
              style={GLASS_SHADOW}
            >
              <Quote
                size={20}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--primary-500)" }}
              />
              <p className="text-sm text-(--text-secondary) sm:text-base italic leading-relaxed">
                "{ABOUT_DEVELOPER.quote}"
              </p>
            </div>

            {/* Social Links */}
            <div className="flex-wrap gap-3 mt-2 justify-center flex">
              {ABOUT_DEVELOPER.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] || Mail;
                const isExternal = !social.internal && !social.href.startsWith("mailto:");
                const sharedClassName = "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-md group";
                const sharedStyle = {
                  backgroundColor: "var(--surface-input)",
                  borderColor: "var(--border-normal)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                };
                const content = (
                  <>
                    <Icon
                      size={16}
                      className="shrink-0 transition-colors duration-200 group-hover:text-(--primary-500)"
                    />
                    <span className="text-sm font-medium transition-colors duration-200 group-hover:text-(--primary-500)">
                      {social.display}
                    </span>
                  </>
                );

                return social.internal ? (
                  <Link
                    key={social.label}
                    to={social.href}
                    className={sharedClassName}
                    style={sharedStyle}
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={sharedClassName}
                    style={sharedStyle}
                  >
                    {content}
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
