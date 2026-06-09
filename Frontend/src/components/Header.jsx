import { useState, useEffect, useRef } from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { UserCircle2 } from "lucide-react";
import ConfirmationModal from "../utils/ConfirmationModal.jsx";

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <NavLink to="/" className="logo">
            SecureAuth
          </NavLink>
        </Motion.div>

        <Motion.nav
          className="nav-links"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Public Nav Links */}
          <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Explore
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Users
          </NavLink>

          {/* Theme Toggle */}
          <Motion.button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.25rem" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <Motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ fontSize: "1.25rem", lineHeight: 1 }}
              >
                {isDark ? "☀️" : "🌙"}
              </Motion.span>
            </AnimatePresence>
          </Motion.button>

          {/* Auth: Avatar dropdown OR Login button */}
          {user ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              {/* Avatar button */}
              <Motion.button
                onClick={() => setDropdownOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
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
                      👤 Profile
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
                      🚪 Logout
                    </button>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
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

