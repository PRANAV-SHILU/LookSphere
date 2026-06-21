import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { BTN_LINK, GLASS_SHADOW } from "../../utils/styles";


export default function CTASection({ user }) {
  return (
    <div className="w-full py-12 xsm:py-16 sm:py-20 md:py-24 3xl:py-28 px-3 xsm:px-4 sm:px-8 md:px-12 relative">
      <div className="max-w-4xl 3xl:max-w-5xl mx-auto text-center relative z-10">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-(--primary-500) text-white shadow-xl shadow-(--primary-500)/30"
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="hero-text text-2xl xsm:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl font-extrabold mb-6">
          {!user ? "Ready to join LookSphere?" : "Explore the Community!"}
        </div>
        <div className="text-base xsm:text-lg sm:text-xl 3xl:text-2xl text-(--text-muted) max-w-2xl 3xl:max-w-3xl mx-auto mb-8 xsm:mb-10 leading-relaxed font-medium">
          {!user
            ? "Join thousands of users who are already exploring, connecting, and creating in a secure environment."
            : "Jump back in to discover trending posts, connect with friends, and share your latest updates."}
        </div>

        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div>
              <NavLink to="/register" className={`${BTN_LINK} btn-primary transition-transform active:scale-95 hover:scale-105`}>
                Create Free Account
              </NavLink>
            </div>
            <div>
              <NavLink to="/login" className={`${BTN_LINK} btn-secondary transition-transform active:scale-95 hover:scale-105`}>
                Sign In
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div>
              <NavLink
                to="/profile"
                className={`${BTN_LINK} btn-primary shadow-lg shadow-(--primary-500)/30 bg-(--primary-500) text-white hover:bg-(--primary-600) transition-transform active:scale-95 hover:scale-105`}
              >
                Update Profile
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/explore"
                className={`${BTN_LINK} btn-secondary border border-(--border-normal) bg-(--surface-input) text-(--text-primary) hover:bg-(--surface-hover) transition-transform active:scale-95 hover:scale-105`}
              >
                Explore
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
