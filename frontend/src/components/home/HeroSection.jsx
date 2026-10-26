import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../../utils/HomeStaticData";
import { BTN_LINK, CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import {
  HeroBackground,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";
import { Compass, User, Sparkles, ArrowRight, MessageSquare } from "lucide-react";

export default function HeroSection({ user }) {
  return (
    <div className="mt-6 px-3 w-full relative xsm:mt-10 3xl:mt-14 4xl:mt-18 xsm:px-4">
      <HeroBackground />
      <div
        className={`liquid-glass w-full text-center p-4 xsm:p-6 sm:p-10 md:p-12 3xl:p-16 4xl:p-20 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
      >
        <CardGlow />
        <div className="flex-col relative flex items-center">
          {/* What's New Live Release Pill Badge */}
          <Link
            to="/whats-new"
            className="inline-flex items-center gap-1.5 xsm:gap-2 px-3 xsm:px-3.5 py-1.5 mb-5 rounded-full bg-linear-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 border border-blue-500/30 text-xs sm:text-sm font-semibold text-(--text-primary) hover:border-blue-400/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all group no-underline"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <Sparkles size={14} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-(--primary-400)">What's New:</span>
            <span className="text-(--text-secondary) hidden xsm:inline">Sparks, Reshares & Support Desk</span>
            <span className="text-(--text-secondary) xsm:hidden">Sparks & Inquiries</span>
            <ArrowRight size={14} className="text-(--primary-400) group-hover:translate-x-1 transition-transform" />
          </Link>

          <h1
            className="flex-wrap mb-4 gap-1 text-3xl font-extrabold justify-center text-(--text-primary) xsm:text-5xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl tracking-tight flex"
          >
            <span className="hero-text drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
              LookSphere
            </span>
          </h1>

          <div className="mb-6 text-base text-(--text-muted) max-w-2xl mx-auto font-medium xsm:text-lg sm:text-xl md:text-2xl 3xl:text-2xl 4xl:text-3xl 4xl:mt-2 3xl:max-w-3xl xsm:mb-8 leading-relaxed">
            A modern, secure, and resilient social media platform. Spark posts, reshare creations, track support inquiries live, and experience a lightning-fast feed with zero layout shift.
          </div>

          {!user && (
            <div className="gap-3 mt-2 justify-center flex flex sm:flex-row sm:gap-4 items-center">
              <div>
                <NavLink to="/register" className={`${BTN_LINK} btn-primary transition-transform active:scale-95 hover:scale-105`}>
                  Get Started Free
                </NavLink>
              </div>
              <div>
                <NavLink to="/login" className={`${BTN_LINK} btn-secondary transition-transform active:scale-95 hover:scale-105`}>
                  Sign In
                </NavLink>
              </div>
            </div>
          )}

          <div
            className="flex-nowrap mt-6 gap-1 mx-auto justify-center overflow-hidden tab-container items-center xsm:gap-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `tab-btn flex items-center gap-1 py-1.5 px-2 xsm:py-2 xsm:px-4 text-[11px] xsm:text-xs sm:text-base 3xl:text-lg no-underline transition-all duration-200 hover:scale-[1.02] hover:text-blue-400! whitespace-nowrap ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <div>
                    <Icon className="w-3.5 h-3.5 xsm:w-4.5 xsm:h-4.5" />
                  </div>
                  {link.label}
                </NavLink>
              );
            })}
          </div>
          
          <div
            className="flex-nowrap mt-4 gap-0.5 mx-auto justify-center overflow-hidden tab-container items-center xsm:gap-2"
          >
            {[
              { to: "/roadmap", icon: Compass, label: "Roadmap" },
              ...(user ? [{ to: "/profile", icon: User, label: "Profile" }] : []),
              { to: "/whats-new", icon: Sparkles, label: "What's New" },
              { to: "/contact-us", icon: MessageSquare, label: "Contact" },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `tab-btn flex items-center gap-1 py-1.5 px-2.5 xsm:py-2 xsm:gap-1 text-[11px] xsm:text-xs sm:px-3 md:px-4 sm:text-base 3xl:text-lg no-underline transition-all duration-200 hover:scale-[1.02] hover:text-blue-400! whitespace-nowrap ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <div>
                    <Icon className="w-2.5 h-2.5 xsm:w-4.5 xsm:h-4.5" />
                  </div>
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
