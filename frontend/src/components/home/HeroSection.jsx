import { NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { HomeAnimation } from "../../utils/animation";
import { navLinks } from "../../utils/staticData";
import { BTN_LINK, CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import { HeroBackground, CardGlow, AnimatedText } from "./Shared";

export default function HeroSection({ user }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <HeroBackground />
      <Motion.div
        className={`liquid-glass w-full text-center p-6 sm:p-10 md:p-12 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
        {...HomeAnimation.fadeInUp}
      >
        <CardGlow />
        <div className="relative">
          <Motion.h1
            className="hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight flex justify-center gap-1 flex-wrap"
            variants={HomeAnimation.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {"LookSphere".split("").map((char, index) => (
              <Motion.span
                key={index}
                {...HomeAnimation.heroTextChild}
                className="inline-block"
              >
                {char}
              </Motion.span>
            ))}
          </Motion.h1>

          <AnimatedText
            text="A minimal, secure, and beautiful platform to share your thoughts, images, and videos. Upload media via Cloudinary, discover global posts, and track your profile views in real-time."
            className="text-lg sm:text-xl md:text-2xl text-(--text-muted) max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
            delay={0.2}
            stagger={0.015}
            yOffset={15}
          />

          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-2">
              <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
                <NavLink to="/register" className={`${BTN_LINK} btn-primary`}>
                  Get Started Free
                </NavLink>
              </Motion.div>
              <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
                <NavLink to="/login" className={`${BTN_LINK} btn-secondary`}>
                  Sign In
                </NavLink>
              </Motion.div>
            </div>
          )}

          <Motion.div
            className="tab-container mx-auto mt-8 flex-wrap"
            {...HomeAnimation.fadeInUpBasic}
            transition={{ delay: 0.5 }}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `tab-btn flex items-center gap-2 py-2 px-4 sm:px-5 text-sm sm:text-base no-underline transition-all duration-200 hover:scale-[1.02] ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <Motion.div {...HomeAnimation.popIn}>
                    <Icon size={18} />
                  </Motion.div>
                  {link.label}
                </NavLink>
              );
            })}
          </Motion.div>
        </div>
      </Motion.div>
    </div>
  );
}
