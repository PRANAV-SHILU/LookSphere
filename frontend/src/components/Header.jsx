import { useState, useEffect, useRef } from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  UserCircle2,
  Sun,
  Moon,
  User,
  LogOut,
  Search,
  Users,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import ConfirmationModal from "../modals/ConfirmationModal.jsx";
import { Header as HeaderAnimation } from "../utils/animation";
import { desktopNavLinkClass, mobileNavLinkClass } from "../utils/styles";

export default function Header() {
  const user = useRouteLoaderData("root");
  const submit = useSubmit();

  const [isDark, setIsDark] = useState(() => {
    // Check local storage or default to dark (since we want a dark-first theme)
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    return true;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleThemeEvent = (e) => {
      setIsDark(e.detail === "dark");
    };
    window.addEventListener("theme-changed", handleThemeEvent);
    return () => window.removeEventListener("theme-changed", handleThemeEvent);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        mobileMenuOpen &&
        !e.target.closest(".mobile-menu-container") &&
        !e.target.closest(".burger-menu-btn")
      ) {
        setMobileMenuOpen(false);
        setMobileProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    setMobileProfileOpen(false);
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <div className="w-full bg-(--header-bg) backdrop-blur-md border-b border-(--border-normal) sticky top-0 z-20">
        <Motion.header
          className="max-w-[1980px] w-[94%] mx-auto flex justify-between items-center px-4 md:px-8 py-4 3xl:py-6"
          {...HeaderAnimation.headerTransition}
        >
          <Motion.div {...HeaderAnimation.logoTransition}>
            <NavLink
              to="/"
              className="text-xl md:text-2xl 3xl:text-3xl font-extrabold no-underline flex items-center gap-2 group"
            >
              <span className="bg-clip-text text-transparent bg-linear-to-tr from-(--primary-600) via-(--secondary-500) to-(--primary-400) drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_4px_15px_rgba(59,130,246,0.5)]">
                LookSphere
              </span>
            </NavLink>
          </Motion.div>

          {/* Theme Toggle & Burger Menu - Mobile Only */}
          <div className="lg:hidden flex items-center gap-2">
            <Motion.button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={HeaderAnimation.themeToggleHover}
              whileTap={HeaderAnimation.themeToggleTap}
              className="bg-transparent border-none cursor-pointer flex items-center p-2 text-(--text-primary)"
            >
              <AnimatePresence mode="wait" initial={false}>
                <Motion.span
                  key={isDark ? "sun" : "moon"}
                  {...HeaderAnimation.themeIconTransition}
                  className="text-xl leading-none"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </Motion.span>
              </AnimatePresence>
            </Motion.button>
            <button
              className="bg-transparent border-none cursor-pointer p-2 text-(--text-primary) flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <Motion.nav
            className="hidden lg:flex lg:gap-6 3xl:gap-8 4xl:gap-10 items-center"
            {...HeaderAnimation.navTransition}
          >
            {user?.role === "admin" && (
              <NavLink to="/dashboard" className={desktopNavLinkClass}>
                <LayoutDashboard className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5 transition-transform duration-300 group-hover:scale-110" />{" "}
                Dashboard
              </NavLink>
            )}
            <NavLink to="/feed" className={desktopNavLinkClass}>
              <ImageIcon className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5 transition-transform duration-300 group-hover:scale-110" />{" "}
              Feed
            </NavLink>
            <NavLink to="/explore" className={desktopNavLinkClass}>
              <Search className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5 transition-transform duration-300 group-hover:scale-110" />{" "}
              Explore
            </NavLink>
            <NavLink to="/creators" className={desktopNavLinkClass}>
              <Users className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5 transition-transform duration-300 group-hover:scale-110" />{" "}
              Creators
            </NavLink>

            {/* Theme Toggle */}
            <Motion.button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={HeaderAnimation.themeToggleHover}
              whileTap={HeaderAnimation.themeToggleTap}
              className="bg-transparent border-none cursor-pointer flex items-center p-2 rounded-full text-(--text-primary) transition-all duration-300 hover:bg-(--surface-hover) hover:text-(--primary-500) hover:shadow-md hover:-translate-y-0.5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <Motion.span
                  key={isDark ? "sun" : "moon"}
                  {...HeaderAnimation.themeIconTransition}
                  className="text-xl leading-none flex items-center"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
                  ) : (
                    <Moon className="w-5 h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
                  )}
                </Motion.span>
              </AnimatePresence>
            </Motion.button>

            {/* Auth: Avatar dropdown OR Login button */}
            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                {/* Avatar button */}
                <Motion.button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  whileHover={HeaderAnimation.avatarHover}
                  whileTap={HeaderAnimation.avatarTap}
                  className="bg-transparent border-none cursor-pointer p-0 flex items-center rounded-full ring-2 ring-transparent transition-all duration-300 hover:ring-(--primary-500) hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:translate-y-[-2px]"
                  aria-label="User menu"
                >
                  {user.profileImage && !imgError ? (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      onError={() => setImgError(true)}
                      className="w-[2.1rem] h-[2.1rem] 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 rounded-full object-cover transition-all duration-300"
                    />
                  ) : (
                    <UserCircle2 className="w-8.5 h-8.5 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-(--text-muted) transition-colors duration-300 hover:text-(--primary-500)" />
                  )}
                </Motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <Motion.div
                      {...HeaderAnimation.dropdownTransition}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.5rem)",
                        right: 0,
                        minWidth: "10rem",
                        background: "var(--surface-card)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-md)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                        overflow: "hidden",
                        zIndex: 100,
                      }}
                    >
                      <NavLink
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-3 text-sm text-(--text-primary) no-underline transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 hover:pl-5 group"
                      >
                        <div className="flex items-center gap-2">
                          <User
                            size={16}
                            className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1"
                          />{" "}
                          Profile
                        </div>
                      </NavLink>

                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-(--status-error) bg-transparent border-none border-t border-(--border-color) cursor-pointer transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 hover:pl-5 group"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut
                            size={16}
                            className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1"
                          />{" "}
                          Logout
                        </div>
                      </button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <NavLink
                  to="/login"
                  className="btn btn-primary 3xl:text-base 3xl:px-5 3xl:py-2.5 4xl:text-lg 4xl:px-6 4xl:py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] hover:text-white hover:bg-blue-500 hover:brightness-110 font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-secondary 3xl:text-base 3xl:px-5 3xl:py-2.5 4xl:text-lg 4xl:px-6 4xl:py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/20 hover:bg-(--surface-hover)"
                >
                  Register
                </NavLink>
              </div>
            )}
          </Motion.nav>

        </Motion.header>
      </div>

      {/* Mobile Menu — rendered outside the sticky header to avoid backdrop-filter clipping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <Motion.div
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-40"
              {...HeaderAnimation.mobileMenuOverlay}
              onClick={() => setMobileMenuOpen(false)}
            />
            <Motion.div
              className="mobile-menu-container fixed top-0 right-0 bottom-0 w-2/3 max-w-[280px] bg-(--surface-normal) border-l border-(--border-normal) shadow-2xl z-50 flex flex-col overflow-y-auto liquid-glass"
              {...HeaderAnimation.mobileMenuContent}
            >
              <div className="flex flex-col p-4 pt-6 gap-2">
                {/* Close Button */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-transparent border-none cursor-pointer text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface-hover) transition-all duration-200"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Nav Links */}
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Home size={20} className="text-inherit" /> Home
                </NavLink>

                {user?.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileNavLinkClass}
                  >
                    <LayoutDashboard size={20} className="text-inherit" />{" "}
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/feed"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <ImageIcon size={20} className="text-inherit" /> Feed
                </NavLink>
                <NavLink
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Search size={20} className="text-inherit" /> Explore
                </NavLink>
                <NavLink
                  to="/creators"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Users size={20} className="text-inherit" /> Creators
                </NavLink>

                {/* Divider */}
                <div className="h-px bg-(--border-color) my-1" />

                {/* Auth Section */}
                {user ? (
                  <>
                    {/* Profile Row */}
                    <div className="flex items-center justify-between w-full hover:bg-(--surface-hover) rounded-lg transition-colors">
                      <NavLink
                        to="/profile"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProfileOpen(false);
                        }}
                        className="flex items-center gap-2 p-3 text-(--text-primary) no-underline flex-1"
                      >
                        {user.profileImage && !imgError ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            onError={() => setImgError(true)}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircle2
                            size={24}
                            className="text-(--text-muted)"
                          />
                        )}
                        <span>{user.username}</span>
                      </NavLink>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileProfileOpen(!mobileProfileOpen);
                        }}
                        className="p-3 bg-transparent border-none cursor-pointer text-(--text-primary) flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label="Toggle profile menu"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${mobileProfileOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Profile Submenu */}
                    <AnimatePresence>
                      {mobileProfileOpen && (
                        <Motion.div
                          {...HeaderAnimation.mobileMenuDropdown}
                          className="overflow-hidden bg-(--surface-input) rounded-xl mt-2 ml-6 pl-1 border border-(--border-normal) flex flex-col gap-4"
                        >
                          <NavLink
                            to="/profile"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProfileOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 pt-3 text-(--text-primary) no-underline rounded-lg hover:bg-(--surface-hover) transition-colors"
                          >
                            <User size={18} /> Profile
                          </NavLink>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProfileOpen(false);
                              setShowLogoutModal(true);
                            }}
                            className="flex items-center gap-3 px-3 pb-3 rounded-lg hover:bg-red-500/10 transition-colors bg-transparent border-none cursor-pointer text-(--status-error) text-left w-full"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <NavLink
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-primary text-center"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-secondary text-center"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}
