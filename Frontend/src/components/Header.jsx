import { useState } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const authData = useRouteLoaderData("root");
  const isLoggedIn = authData.isLoggedIn;

  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  function toggleTheme() {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  }

  return (
    <Motion.header
      className="header-bar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight text-primary transition-colors duration-200 hover:text-blue-500 dark:hover:text-[#4da3ff]"
          >
            SecureAuth
          </NavLink>
        </Motion.div>

        {/* Nav + Toggle */}
        <Motion.div
          className="flex items-center gap-3 sm:gap-5"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <ul className="flex gap-1 items-center flex-wrap justify-center">
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>

          {/* Theme Toggle */}
          <Motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <Motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-lg leading-none"
              >
                {isDark ? "☀️" : "🌙"}
              </Motion.span>
            </AnimatePresence>
          </Motion.button>
        </Motion.div>
      </nav>
    </Motion.header>
  );
}
