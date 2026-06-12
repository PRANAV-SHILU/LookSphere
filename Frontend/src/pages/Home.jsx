import { NavLink, useRouteLoaderData } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Home as HomeAnimation } from "../utils/animation";

const keyFeatures = [
  "Secure JWT Cookie-based Authentication",
  "Protected Profile & Edit Routes via Loaders",
  "Real-time Theme Toggling (Dark/Light Mode)",
  "Schema-based Form Validation (Yup)",
  "Global State Hydration without Context",
  "Fluid Page & Scroll Animations (Framer Motion)",
];

const techStack = [
  "Frontend: React + React Router DOM",
  "Styling: Tailwind CSS + Framer Motion",
  "Forms: React Hook Form + Yup",
  "Backend: Node.js + Express.js",
  "Database: MongoDB (Mongoose)",
  "Auth: JSON Web Tokens (HttpOnly Cookies)",
];

const authenticationFlow = [
  "1. Registration: User submits details; React Hook Form & Yup validate data client-side.",
  "2. Backend Hashing: Express API receives data, hashes password via bcrypt, and saves to MongoDB.",
  "3. Login: User submits credentials; backend verifies hash and issues an HttpOnly JWT cookie.",
  "4. Client Hydration: Axios includes the cookie; loaders fetch the profile data seamlessly.",
  "5. Protected Routes: React Router checks auth state before rendering private pages (/profile).",
  "6. Logout: User clicks logout; backend clears cookie and frontend wipes local state instantly.",
];

const whatsNext = [
  "Role-Based Access Control (Admin vs User dashboards)",
  "OAuth 2.0 Integration (Google, GitHub social logins)",
  "Email Verification & Password Reset flows (Nodemailer)",
  "Rate Limiting & Brute Force Protection (Express-rate-limit)",
  "Refresh Token Rotation Strategy for extended sessions",
  "Profile Image Uploads (Multer + Cloud storage)",
];



export default function Home() {
  const user = useRouteLoaderData("root");
  const name = user?.username;

  const cardAnimation = HomeAnimation.cardAnimation;
  const bottomAnimation = HomeAnimation.bottomAnimation;

  return (
    <Motion.section
      className="flex flex-col items-center"
      style={{ gap: "3rem" }}
      {...HomeAnimation.pageTransition}
    >
      {/* Hero */}
      <div className="text-center" style={{ maxWidth: "800px" }}>
        <Motion.h1
          className="hero-text"
          {...HomeAnimation.h1}
        >
          Hello {name ? name : "User"}!
        </Motion.h1>
        <Motion.h2
          className="mb-4"
          {...HomeAnimation.h2}
        >
          SecureAuth – Modern React Authentication
        </Motion.h2>
        <Motion.p
          {...HomeAnimation.p}
        >
          SecureAuth is a full-stack authentication system built using React, 
          Node.js, and MongoDB. It demonstrates real-world security patterns 
          like HttpOnly JWT cookies and React Router data loaders.
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
        <Motion.div
          className="card"
          {...cardAnimation}
          transition={{ ...cardAnimation.transition, delay: 0.05 }}
        >
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
          <ol style={{ paddingLeft: "1.2rem", listStyleType: "none" }}>
            {authenticationFlow.map((step, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {step}
              </li>
            ))}
          </ol>
        </Motion.div>

        {/* What's Next */}
        <Motion.div className="card" {...cardAnimation}>
          <h3>What's Next? (Future Enhancements)</h3>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {whatsNext.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </Motion.div>
      </div>

      {/* CTA */}
      {!user && (
        <Motion.div className="text-center pb-4" {...bottomAnimation}>
          <p>
            <NavLink to="/login" className="btn btn-secondary">
              Log in
            </NavLink>
            <span style={{ margin: "0 1rem" }}>or</span>
            <NavLink to="/register" className="btn btn-primary">
              Register
            </NavLink>
          </p>
        </Motion.div>
      )}
      {/* Thank You Message */}
      <Motion.div
        className="text-center pb-8"
        {...bottomAnimation}
        style={{
          marginTop: "2rem",
          color: "var(--text-muted)",
          fontStyle: "italic",
        }}
      >
        <p>Thank you for visiting! We hope you enjoy exploring SecureAuth.</p>
      </Motion.div>
    </Motion.section>
  );
}
