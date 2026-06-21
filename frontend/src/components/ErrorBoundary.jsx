import { useRouteError, isRouteErrorResponse, NavLink } from "react-router-dom";

import Header from "./Header";

export default function ErrorBoundary() {
  const error = useRouteError();

  const content = isRouteErrorResponse(error) ? (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold hero-text">Error {error.status}</h1>
      <p className="text-base md:text-lg text-slate-400 mt-3">{error.statusText}</p>
    </>
  ) : (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold hero-text">Something went wrong!</h1>
      <p className="text-sm md:text-base text-slate-400 mt-3">
        {error?.message || "Unknown error occurred."}
      </p>
    </>
  );

  return (
    <>
      <Header />
      <div
        className="flex gap-2 px-4 lg:gap-8 flex-col items-center justify-center text-center min-h-screen"
      >

      {content}

      <NavLink
        to="/"
        className="mt-4 px-4 md:px-6 py-2 md:py-3 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
        style={{ backgroundColor: "var(--primary-500)", color: "white" }}
      >
        Go to Home
      </NavLink>
    </div>
    </>
  );
}
