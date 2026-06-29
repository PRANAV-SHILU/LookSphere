import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/staticData";
import { BTN_LINK, CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import {
  HeroBackground,
  CardGlow,
} from "../../shared-components/SharedHomeComponents";

export default function HeroSection({ user }) {
  return (
    <div className="relative w-full max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mt-8 xsm:mt-12 3xl:mt-14 4xl:mt-18 mx-auto px-3 xsm:px-4">
      <HeroBackground />
      <div
        className={`liquid-glass w-full text-center p-4 xsm:p-6 sm:p-10 md:p-12 3xl:p-16 4xl:p-20 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
      >
        <CardGlow />
        <div className="relative ">
          <h1
            className="text-3xl xsm:text-5xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl font-extrabold mb-4 tracking-tight flex justify-center gap-1 flex-wrap text-(--text-primary)"
          >
            <span className="hero-text drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
              LookSphere
            </span>
          </h1>

          <div className="text-base xsm:text-lg sm:text-xl md:text-2xl 3xl:text-2xl 4xl:text-3xl text-(--text-muted) 4xl:mt-2 max-w-2xl 3xl:max-w-3xl mx-auto mb-6 xsm:mb-8 font-medium leading-relaxed">
            A minimal, secure, and beautiful platform to share your thoughts, images, and videos. Upload media, discover global posts, and track your profile views in real-time.
          </div>

          {!user && (
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-2">
              <div>
                <NavLink to="/register" className={`${BTN_LINK} btn-primary transition-transform active:scale-95`}>
                  Get Started Free
                </NavLink>
              </div>
              <div>
                <NavLink to="/login" className={`${BTN_LINK} btn-secondary transition-transform active:scale-95`}>
                  Sign In
                </NavLink>
              </div>
            </div>
          )}

          <div
            className="tab-container mx-auto mt-8 flex-wrap"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `tab-btn flex items-center gap-1.5 xsm:gap-2 py-2 px-3 xsm:px-4 sm:px-5 text-xs xsm:text-sm sm:text-base 3xl:text-lg no-underline transition-all duration-200 hover:scale-[1.02] ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <div>
                    <Icon size={18} />
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
