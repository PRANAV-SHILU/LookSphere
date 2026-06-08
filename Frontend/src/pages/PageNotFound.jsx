import { NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <Motion.section
      className="flex flex-col items-center justify-center gap-4 text-center"
      style={{ minHeight: "60vh" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Motion.h1
        className="hero-text"
        style={{ fontSize: "5rem", marginBottom: 0 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.45, type: "spring", stiffness: 200 }}
      >
        404
      </Motion.h1>

      <Motion.h2
        className="mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Page not found
      </Motion.h2>

      <Motion.p
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Kindly redirect to the home page.
      </Motion.p>

      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </Motion.div>
    </Motion.section>
  );
}
