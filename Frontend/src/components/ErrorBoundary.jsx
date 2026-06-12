import { useRouteError, isRouteErrorResponse, NavLink } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ErrorBoundary as ErrorBoundaryAnimation } from "../utils/animation";

export default function ErrorBoundary() {
  const error = useRouteError();

  const content = isRouteErrorResponse(error) ? (
    <>
      <h1 className="text-5xl font-bold text-red-400">Error {error.status}</h1>
      <p className="text-lg text-slate-400 mt-3">{error.statusText}</p>
    </>
  ) : (
    <>
      <h1 className="text-4xl font-bold text-red-400">Something went wrong!</h1>
      <p className="text-slate-400 mt-3">
        {error?.message || "Unknown error occurred."}
      </p>
    </>
  );

  return (
    <Motion.div
      className="flex flex-col items-center justify-center text-center py-24"
      {...ErrorBoundaryAnimation.containerTransition}
    >
      {content}
      <NavLink
        to="/"
        className="mt-8 px-6 py-2.5 rounded-lg font-semibold transition-colors"
        style={{ backgroundColor: "var(--primary-500)", color: "white" }}
      >
        Go to Home
      </NavLink>
    </Motion.div>
  );
}
