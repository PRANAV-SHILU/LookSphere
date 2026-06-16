import { useState, useEffect, useRef } from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { UserCircle2, Sun, Moon, User, LogOut, Search, Users, Home, Image as ImageIcon, LayoutDashboard, Menu, X, ChevronDown } from "lucide-react";
import ConfirmationModal from "../modals/ConfirmationModal.jsx";
import { Header as HeaderAnimation } from "../utils/animation";

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
      if (mobileMenuOpen && !e.target.closest('.mobile-menu-container') && !e.target.closest('.burger-menu-btn')) {
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
        <Motion.div
          {...HeaderAnimation.logoTransition}
        >
          <NavLink to="/" className="text-xl md:text-2xl 3xl:text-3xl font-extrabold text-(--text-primary) no-underline flex items-center gap-2">
            LookSphere
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
          {/* Public Nav Links */}
          <NavLink to="/" className={({ isActive }) => `text-sm 3xl:text-base 4xl:text-lg font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-1.5`}>
            <Home className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5" /> Home
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/dashboard" className={({ isActive }) => `text-sm 3xl:text-base 4xl:text-lg font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-1.5`}>
              <LayoutDashboard className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5" /> Dashboard
            </NavLink>
          )}
          <NavLink to="/feed" className={({ isActive }) => `text-sm 3xl:text-base 4xl:text-lg font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-1.5`}>
            <ImageIcon className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5" /> Feed
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `text-sm 3xl:text-base 4xl:text-lg font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-1.5`}>
            <Search className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5" /> Explore
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `text-sm 3xl:text-base 4xl:text-lg font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-1.5`}>
            <Users className="w-4.5 h-4.5 3xl:w-5 3xl:h-5 4xl:w-5.5 4xl:h-5.5" /> Users
          </NavLink>

          {/* Theme Toggle */}
          <Motion.button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={HeaderAnimation.themeToggleHover}
            whileTap={HeaderAnimation.themeToggleTap}
            className="bg-transparent border-none cursor-pointer flex items-center p-1 text-(--text-primary)"
          >
            <AnimatePresence mode="wait" initial={false}>
              <Motion.span
                key={isDark ? "sun" : "moon"}
                {...HeaderAnimation.themeIconTransition}
                className="text-xl leading-none flex items-center"
              >
                {isDark ? <Sun className="w-5 h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" /> : <Moon className="w-5 h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />}
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
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
                aria-label="User menu"
              >
                {user.profileImage && !imgError ? (
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    onError={() => setImgError(true)}
                    className="w-[2.1rem] h-[2.1rem] 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 rounded-full object-cover border-2 border-(--border-color)"
                  />
                ) : (
                  <UserCircle2 className="w-8.5 h-8.5 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-(--text-muted)" />
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
                      style={{ display: "block", padding: "0.65rem 1rem", fontSize: "0.9rem", color: "var(--text-primary)", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--surface-input)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><User size={16} /> Profile</div>
                    </NavLink>

                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        setShowLogoutModal(true);
                      }}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "0.65rem 1rem", fontSize: "0.9rem", color: "var(--status-error)", background: "transparent", border: "none", cursor: "pointer", borderTop: "1px solid var(--border-color)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--surface-input)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><LogOut size={16} /> Logout</div>
                    </button>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <NavLink to="/login" className="btn btn-primary 3xl:text-base 3xl:px-5 3xl:py-2.5 4xl:text-lg 4xl:px-6 4xl:py-3">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-secondary 3xl:text-base 3xl:px-5 3xl:py-2.5 4xl:text-lg 4xl:px-6 4xl:py-3">
                Register
              </NavLink>
            </div>
          )}
        </Motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Blur Overlay */}
              <Motion.div
                className="lg:hidden fixed top-[74px] left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <Motion.div
                className="mobile-menu-container pr-6 lg:hidden fixed top-[74px] right-0 w-64 h-[calc(100vh-72px)] bg-(--surface-card) border-l border-(--border-color) z-50 overflow-y-auto shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
              <div className="flex flex-col p-4 gap-2">
                {/* Nav Links */}
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-2 p-3 text-(--text-primary) no-underline`}
                >
                  <Home size={18} /> Home
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-2 p-3 text-(--text-primary) no-underline`}
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/feed"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-2 p-3 text-(--text-primary) no-underline`}
                >
                  <ImageIcon size={18} /> Feed
                </NavLink>
                <NavLink
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-2 p-3 text-(--text-primary) no-underline`}
                >
                  <Search size={18} /> Explore
                </NavLink>
                <NavLink
                  to="/users"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) ${isActive ? "text-(--text-primary)" : ""} flex items-center gap-2 p-3 text-(--text-primary) no-underline`}
                >
                  <Users size={18} /> Users
                </NavLink>

                {/* Divider */}
                <div className="h-px bg-(--border-color) my-1" />

                {/* Auth Section */}
                {user ? (
                  <>
                    {/* Profile Button */}
                    <button
                      onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                      className="flex items-center justify-between p-3 bg-transparent border-none cursor-pointer text-(--text-primary) text-left w-full"
                    >
                      <div className="flex items-center gap-2">
                        {user.profileImage && !imgError ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            onError={() => setImgError(true)}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircle2 size={24} className="text-(--text-muted)" />
                        )}
                        <span>{user.username}</span>
                      </div>
                      <ChevronDown size={16} className={`transition-transform ${mobileProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Submenu */}
                    <AnimatePresence>
                      {mobileProfileOpen && (
                        <Motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-8 flex flex-col gap-4"
                        >
                          <NavLink
                            to="/profile"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProfileOpen(false);
                            }}
                            className="flex items-center gap-2 px-2 text-(--text-primary) no-underline"
                          >
                            <User size={16} /> Profile
                          </NavLink>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProfileOpen(false);
                              setShowLogoutModal(true);
                            }}
                            className="flex items-center gap-2 px-2 bg-transparent border-none cursor-pointer text-(--status-error) text-left"
                          >
                            <LogOut size={16} /> Logout
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
      </Motion.header>
      </div>

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

