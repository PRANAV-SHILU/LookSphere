import { useState, useEffect } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const user = useRouteLoaderData("root");

  const [isDark, setIsDark] = useState(() => {
    // Check local storage or default to dark (since we want a dark-first theme)
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }
    return true; // Dark first default
  });

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

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
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
        {user ? (
          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {user?.username ? `@${user.username}` : "Profile"}
          </NavLink>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}

        {/* Theme Toggle */}
        <Motion.button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.25rem",
          }}
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
      </Motion.nav>
    </Motion.header>
  );
}
