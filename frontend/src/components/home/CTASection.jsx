import { NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HomeAnimation } from "../../utils/animation";
import { BTN_LINK, GLASS_SHADOW } from "../../utils/styles";
import { AnimatedText } from "./Shared";

export default function CTASection({ user }) {
  return (
    <div className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-(--primary-500) text-white shadow-xl shadow-(--primary-500)/30"
          {...HomeAnimation.sparklesIcon}
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
        </Motion.div>

        <AnimatedText
          text={!user ? "Ready to join LookSphere?" : "Explore the Community!"}
          className="hero-text text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
          delay={0}
          stagger={0.03}
        />
        <AnimatedText
          text={!user
            ? "Join thousands of users who are already exploring, connecting, and creating in a secure environment."
            : "Jump back in to discover trending posts, connect with friends, and share your latest updates."}
          className="text-lg sm:text-xl text-(--text-muted) max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          delay={0.2}
          stagger={0.015}
          yOffset={15}
        />

        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
              <NavLink to="/register" className={`${BTN_LINK} btn-primary`}>
                Create Free Account
              </NavLink>
            </Motion.div>
            <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
              <NavLink to="/login" className={`${BTN_LINK} btn-secondary`}>
                Sign In
              </NavLink>
            </Motion.div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
              <NavLink
                to="/profile"
                className={`${BTN_LINK} btn-primary shadow-lg shadow-(--primary-500)/30 bg-(--primary-500) text-white hover:bg-(--primary-600)`}
              >
                Update Profile
              </NavLink>
            </Motion.div>
            <Motion.div {...HomeAnimation.buttonEntrance} {...HomeAnimation.scaleUpHover}>
              <NavLink
                to="/explore"
                className={`${BTN_LINK} btn-secondary border border-(--border-normal) bg-(--surface-input) text-(--text-primary) hover:bg-(--surface-hover)`}
              >
                Explore
              </NavLink>
            </Motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
