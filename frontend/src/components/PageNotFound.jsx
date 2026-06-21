import { NavLink } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";


export default function PageNotFound() {
  useDocumentMetadata("Page Not Found");
  return (
    <>
      <section
        className="flex flex-col items-center justify-center gap-4 text-center px-4 min-h-screen"
      >
      <h1
        className="hero-text text-8xl"
      >
        404
      </h1>

      <h2
        className="text-xl md:text-2xl lg:text-3xl mb-1"
      >
        Page not found
      </h2>

      <p
        className="text-sm md:text-base max-w-md"
      >
        Kindly go back to the home page.
      </p>

      <div>
        <NavLink to="/" className="mt-4 btn btn-primary text-sm md:text-base px-5 md:px-6 py-2 md:py-2.5">
          Go Home
        </NavLink>
      </div>
    </section>
    </>
  );
}
