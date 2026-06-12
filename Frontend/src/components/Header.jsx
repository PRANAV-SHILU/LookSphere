import { useState, useEffect, useRef } from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { UserCircle2, Sun, Moon, User, LogOut, Search, Users, Home, Image as ImageIcon, LayoutDashboard } from "lucide-react";
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

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <Motion.header
        className="app-header"
        {...HeaderAnimation.headerTransition}
      >
        <Motion.div
          {...HeaderAnimation.logoTransition}
        >
          <NavLink to="/" className="logo">
            SecureAuth
          </NavLink>
        </Motion.div>

        <Motion.nav
          className="nav-links"
          {...HeaderAnimation.navTransition}
        >
          {/* Public Nav Links */}
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Home size={18} /> Home
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          )}
          <NavLink to="/feed" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ImageIcon size={18} /> Feed
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Search size={18} /> Explore
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Users size={18} /> Users
          </NavLink>

          {/* Theme Toggle */}
          <Motion.button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={HeaderAnimation.themeToggleHover}
            whileTap={HeaderAnimation.themeToggleTap}
            style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.25rem", color: "var(--text-primary)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <Motion.span
                key={isDark ? "sun" : "moon"}
                {...HeaderAnimation.themeIconTransition}
                style={{ fontSize: "1.25rem", lineHeight: 1 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
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
                    style={{ width: "2.1rem", height: "2.1rem", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border-color)" }}
                  />
                ) : (
                  <UserCircle2 size={34} style={{ color: "var(--text-muted)" }} />
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
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-secondary">
                Register
              </NavLink>
            </div>
          )}
        </Motion.nav>
      </Motion.header>

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

