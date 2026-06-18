import { NavLink } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { motion as Motion } from "framer-motion";
import { PageNotFound as PageNotFoundAnimation } from "../utils/animation";

export default function PageNotFound() {
  useDocumentMetadata("Page Not Found");
  return (
    <>
      <Motion.section
        className="flex flex-col items-center justify-center gap-4 text-center px-4 min-h-screen"
        {...PageNotFoundAnimation.pageTransition}
      >
      <Motion.h1
        className="hero-text text-8xl"
        {...PageNotFoundAnimation.h1}
      >
        404
      </Motion.h1>

      <Motion.h2
        className="text-xl md:text-2xl lg:text-3xl mb-1"
        {...PageNotFoundAnimation.h2}
      >
        Page not found
      </Motion.h2>

      <Motion.p
        className="text-sm md:text-base max-w-md"
        {...PageNotFoundAnimation.p}
      >
        Kindly go back to the home page.
      </Motion.p>

      <Motion.div
        {...PageNotFoundAnimation.buttonWrapper}
      >
        <NavLink to="/" className="mt-4 btn btn-primary text-sm md:text-base px-5 md:px-6 py-2 md:py-2.5">
          Go Home
        </NavLink>
      </Motion.div>
    </Motion.section>
    </>
  );
}
