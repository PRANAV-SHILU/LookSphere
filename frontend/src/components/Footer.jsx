import { NavLink, useRouteLoaderData } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "../shared-components/SvgIcons";
import { Mail } from "lucide-react";

export default function Footer() {
  const user = useRouteLoaderData("root");
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-(--header-bg) border-t border-(--border-normal) pt-12 pb-6 mt-auto">
      <div className="max-w-[1980px] w-[94%] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <NavLink
              to="/"
              className="text-xl md:text-2xl font-extrabold no-underline flex items-center gap-2 group"
            >
              <span className="bg-clip-text text-transparent bg-linear-to-tr from-(--primary-600) via-(--secondary-500) to-(--primary-400) drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                LookSphere
              </span>
            </NavLink>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              Connect, Share, and Discover the world through LookSphere. Building communities and bridging connections.
            </p>
            <div className="flex flex-wrap gap-5 mt-2">
              <a href="https://www.linkedin.com/in/pranavshilu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2 text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm font-medium">
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/PRANAV-SHILU" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2 text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm font-medium">
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a href="mailto:pranavshilu@zohomail.in" aria-label="Mail" className="flex items-center gap-2 text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm font-medium">
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            {/* Group 1: Navigation/Account */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-(--text-primary) text-lg mb-2">Account</h3>
              <NavLink to="/" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Home
              </NavLink>
              {user?.role === "admin" && (
                <NavLink to="/dashboard" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                  Dashboard
                </NavLink>
              )}
              {!user && (
                <>
                  <NavLink to="/login" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                    Register
                  </NavLink>
                </>
              )}
              {user && (
                <NavLink to="/profile" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                  Profile
                </NavLink>
              )}
            </div>

            {/* Group 2: Explore */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-(--text-primary) text-lg mb-2">Explore</h3>
              <NavLink to="/feed" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Feed
              </NavLink>
              <NavLink to="/explore" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Explore
              </NavLink>
              <NavLink to="/creators" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Creators
              </NavLink>
            </div>

            {/* Group 3: Legal */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-(--text-primary) text-lg mb-2">Support & Legal</h3>
              <NavLink to="/faq" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                FAQ
              </NavLink>
              <NavLink to="/privacy-policy" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms-and-conditions" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm">
                Terms & Conditions
              </NavLink>
            </div>

            {/* Group 4: Updates */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-(--text-primary) text-lg mb-2">Updates</h3>
              <NavLink to="/whats-new" className="text-(--text-secondary) hover:text-(--primary-500) transition-colors text-sm flex items-center gap-2 w-fit">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                What's New
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-(--border-normal) flex flex-col items-center justify-center text-center gap-2">
          <div className="text-sm text-(--text-muted) italic max-w-xl mx-auto mb-2">
            Thank you for visiting! We hope you enjoy exploring LookSphere.
          </div>
          <p className="text-(--text-secondary) text-sm">
            © {year} LookSphere. Made with <span className="text-red-500">❤️</span> in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
