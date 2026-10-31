import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { BTN_LINK, GLASS_SHADOW } from "../../utils/styles";


export default function CTASection({ user }) {
  return (
    <div className="py-10 px-2 w-full xsm:py-12 sm:py-16 md:py-20 3xl:py-24 xsm:px-4 sm:px-8 md:px-12 relative">
      <div className="w-full text-center z-10 relative">
        <div
          className="mb-6 w-16 h-16 mx-auto justify-center rounded-2xl bg-(--primary-500) text-white shadow-xl shadow-(--primary-500)/30 sm:w-20 sm:h-20 flex items-center"
        >
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <div className="mb-6 text-2xl font-extrabold hero-text xsm:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl">
          {!user ? "Ready to join LookSphere?" : "Explore the Community!"}
        </div>
        <div className="mb-8 text-base text-(--text-muted) max-w-2xl mx-auto font-medium xsm:text-lg sm:text-xl 3xl:text-2xl 3xl:max-w-3xl xsm:mb-10 leading-relaxed">
          {!user
            ? "Join creators, thinkers, and innovators who are already exploring, sparking posts, and connecting in a resilient, secure environment."
            : "Jump back in to discover trending posts, connect with friends, and share your latest updates."}
        </div>

        {/* Conditional Auth Buttons (Top) */}
        <div className="flex-wrap mb-6 gap-4 justify-center flex items-center">
          {!user ? (
            <>
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
            </>
          ) : (
            <div>
              <NavLink
                to="/profile"
                className={`${BTN_LINK} btn-primary shadow-lg shadow-(--primary-500)/30 bg-(--primary-500) text-white hover:bg-(--primary-600) transition-transform active:scale-95 hover:scale-105`}
              >
                Profile
              </NavLink>
            </div>
          )}
        </div>

        {/* Permanent Navigation Buttons (Below) */}
        <div className="flex-wrap gap-4 justify-center flex items-center">
          <div>
            <NavLink
              to="/feed"
              className={`${BTN_LINK} btn-secondary border border-(--border-normal) bg-(--surface-input) text-(--text-primary) hover:bg-(--surface-hover) transition-transform active:scale-95 hover:scale-105`}
            >
              Feed
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
          <div>
            <NavLink
              to="/creators"
              className={`${BTN_LINK} btn-secondary border border-(--border-normal) bg-(--surface-input) text-(--text-primary) hover:bg-(--surface-hover) transition-transform active:scale-95 hover:scale-105`}
            >
              Creators
            </NavLink>
          </div>
        </div>

        {/* Secondary Links */}
        <div className="flex-wrap mt-12 gap-x-6 gap-y-2 justify-center text-xs font-bold text-(--text-muted) flex sm:text-sm">
          <NavLink to="/whats-new" className="hover:text-(--primary-500) transition-colors no-underline">
            What's New
          </NavLink>
          <span className="hidden xsm:inline opacity-40 select-none">•</span>
          <NavLink to="/roadmap" className="hover:text-(--primary-500) transition-colors no-underline">
            Roadmap
          </NavLink>
          <span className="hidden xsm:inline opacity-40 select-none">•</span>
          <NavLink to="/contact-us" className="hover:text-(--primary-500) transition-colors no-underline">
            Contact Us
          </NavLink>
          <span className="hidden xsm:inline opacity-40 select-none">•</span>
          <NavLink to="/faq" className="hover:text-(--primary-500) transition-colors no-underline">
            FAQ
          </NavLink>
        </div>
      </div>
    </div>
  );
}
