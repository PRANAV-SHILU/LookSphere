import { NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { HomeAnimation } from "../../utils/animation";
import { navLinks } from "../../utils/staticData";
import { BTN_LINK, CARD_HOVER_SUBTLE, GLASS_SHADOW } from "../../utils/styles";
import {
  HeroBackground,
  CardGlow,
  AnimatedText,
} from "../../shared-components/SharedHomeComponents";

export default function HeroSection({ user }) {
  return (
    <div className="relative w-full max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mt-8 xsm:mt-12 3xl:mt-14 4xl:mt-18 mx-auto px-3 xsm:px-4">
      <HeroBackground />
      <Motion.div
        className={`liquid-glass w-full text-center p-4 xsm:p-6 sm:p-10 md:p-12 3xl:p-16 4xl:p-20 rounded-2xl relative z-10 ${CARD_HOVER_SUBTLE}`}
        style={GLASS_SHADOW}
        {...HomeAnimation.fadeInUp}
      >
        <CardGlow />
        <div className="relative ">
          <Motion.h1
            className="hero-text text-3xl xsm:text-5xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl font-extrabold mb-4 tracking-tight flex justify-center gap-1 flex-wrap"
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
            className="text-base xsm:text-lg sm:text-xl md:text-2xl 3xl:text-2xl 4xl:text-3xl text-(--text-muted) 4xl:mt-2 max-w-2xl 3xl:max-w-3xl mx-auto mb-6 xsm:mb-8 font-medium leading-relaxed"
            delay={0.2}
            stagger={0.015}
            yOffset={15}
          />

          {!user && (
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-2">
              <Motion.div
                {...HomeAnimation.buttonEntrance}
                {...HomeAnimation.scaleUpHover}
              >
                <NavLink to="/register" className={`${BTN_LINK} btn-primary`}>
                  Get Started Free
                </NavLink>
              </Motion.div>
              <Motion.div
                {...HomeAnimation.buttonEntrance}
                {...HomeAnimation.scaleUpHover}
              >
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
                    `tab-btn flex items-center gap-1.5 xsm:gap-2 py-2 px-3 xsm:px-4 sm:px-5 text-xs xsm:text-sm sm:text-base 3xl:text-lg no-underline transition-all duration-200 hover:scale-[1.02] ${
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
