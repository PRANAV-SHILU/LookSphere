import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const keyFeatures = [
  "User Registration and Login",
  "Protected Dashboard Routes",
  "Edit User Details",
  "Query String Handling",
  "Schema-based Form Validation",
  "Toast Notifications and Loaders",
  "Multi-user API State Handling",
];

const techStack = [
  "React JS",
  "React Router DOM",
  "React Hook Form + Yup",
  "JSON Server (Self-made REST API)",
  "React Toastify and React Spinners",
];

const authenticationFlow = [
  "User registers through the API",
  "Credentials are validated during login",
  "Authentication state controls route access",
  "Protected routes restrict unauthenticated users",
  "Logout updates session state on the client",
  "User profile changes sync with the API",
];

const cardAnimation = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Home() {
  const user = useRouteLoaderData("root");
  const name = user?.username;

  return (
    <Motion.section
      className="flex flex-col items-center"
      style={{ gap: "3rem" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div className="text-center" style={{ maxWidth: "800px" }}>
        <Motion.h1
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Hello {name ? name : "User"}!
        </Motion.h1>
        <Motion.h2
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          SecureAuth – Modern React Authentication
        </Motion.h2>
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          SecureAuth is a frontend-focused authentication system built using
          React and React Router DOM. It demonstrates real-world authentication
          patterns without relying on backend authentication or databases.
        </Motion.p>
      </div>

      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: "800px" }}>
        {/* Key Features */}
        <Motion.div className="card" {...cardAnimation}>
          <h3>Key Features</h3>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {keyFeatures.map((feature, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {feature}
              </li>
            ))}
          </ul>
        </Motion.div>

        {/* Tech Stack */}
        <Motion.div className="card" {...cardAnimation} transition={{ ...cardAnimation.transition, delay: 0.05 }}>
          <h3>Tech Stack</h3>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {techStack.map((tech, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {tech}
              </li>
            ))}
          </ul>
        </Motion.div>

        {/* Authentication Flow */}
        <Motion.div className="card" {...cardAnimation}>
          <h3>Authentication Flow</h3>
          <ol style={{ paddingLeft: "1.2rem" }}>
            {authenticationFlow.map((step, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {step}
              </li>
            ))}
          </ol>
        </Motion.div>
      </div>

      {/* CTA */}
      <Motion.div
        className="text-center pb-4"
        {...cardAnimation}
      >
        <p>
          <NavLink to="/login" className="btn btn-secondary">Log in</NavLink>
          <span style={{ margin: "0 1rem" }}>or</span>
          <NavLink to="/register" className="btn btn-primary">Register</NavLink>
        </p>
      </Motion.div>
    </Motion.section>
  );
}
