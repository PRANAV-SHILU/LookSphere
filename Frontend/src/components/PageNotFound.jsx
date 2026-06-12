import { NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { PageNotFound as PageNotFoundAnimation } from "../utils/animation";

export default function PageNotFound() {
  return (
    <Motion.section
      className="flex flex-col items-center justify-center gap-4 text-center"
      style={{ minHeight: "60vh" }}
      {...PageNotFoundAnimation.pageTransition}
    >
      <Motion.h1
        className="hero-text"
        style={{ fontSize: "5rem", marginBottom: 0 }}
        {...PageNotFoundAnimation.h1}
      >
        404
      </Motion.h1>

      <Motion.h2
        className="mb-2"
        {...PageNotFoundAnimation.h2}
      >
        Page not found
      </Motion.h2>

      <Motion.p
        className="mb-4"
        {...PageNotFoundAnimation.p}
      >
        Kindly go back to the home page.
      </Motion.p>

      <Motion.div
        {...PageNotFoundAnimation.buttonWrapper}
      >
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </Motion.div>
    </Motion.section>
  );
}
