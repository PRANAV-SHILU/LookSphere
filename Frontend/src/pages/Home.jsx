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

const futurePlans = [
  {
    emoji: "🔐",
    title: "Token-Based Auth & Session Expiry",
    desc: "Generate fake tokens post-login, attach to API headers, and auto-logout on session timeout with a 'Session Expired' toast.",
  },
  {
    emoji: "🛡️",
    title: "Tamper Detection",
    desc: "Cross-check stored token/email with live API data on every protected route. Force logout on any localStorage mismatch.",
  },
  {
    emoji: "👑",
    title: "Role-Based Access Control (RBAC)",
    desc: "Admin dashboard to manage users (view, delete, block). Role-protected routes that redirect unauthorized access.",
  },
  {
    emoji: "👤",
    title: "Advanced Profile & Audit System",
    desc: "Profile picture, bio, and address fields. Track loginCount, lastLogin, createdAt, and updatedAt timestamps.",
  },
  {
    emoji: "🔑",
    title: "Password & Account Management",
    desc: "Change password flow, forgot password simulation, account deactivation toggle, and login attempt lockout.",
  },
  {
    emoji: "🎨",
    title: "UI/UX Professional Upgrade",
    desc: "Skeleton loaders, global loading state, custom 403/404/500 error pages, password strength meter, and dark/light theme toggle.",
  },
  {
    emoji: "📱",
    title: "Multi-Device Session & Remember Me",
    desc: "Persistent sessions via localStorage (30 days) vs temporary via sessionStorage. Simulated device tracking.",
  },
];

/* Shared animation config for scroll-triggered cards */
const cardAnimation = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Home() {
  const authData = useRouteLoaderData("root");
  const name = authData?.name;

  return (
    <Motion.section
      className="flex flex-col gap-12 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Hero ── */}
      <div className="max-w-[900px] text-center">
        <Motion.h1
          className="text-[28px] sm:text-[36px] md:text-[46px] font-bold mb-3 text-primary"
          style={{ textShadow: "0 0 18px rgba(77,163,255,0.2)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Hello {name ? name : "User"}!
        </Motion.h1>
        <Motion.h2
          className="text-xl md:text-[22px] text-muted mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          SecureAuth – Modern React Authentication System
        </Motion.h2>
        <Motion.p
          className="text-base text-muted leading-[1.7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          SecureAuth is a frontend-focused authentication system built using
          React and React Router DOM. It demonstrates real-world authentication
          patterns without relying on backend authentication or databases.
        </Motion.p>
      </div>

      {/* ── Key Features ── */}
      <Motion.div className="card" {...cardAnimation}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          Key Features
        </h3>
        <ul className="pl-[18px] pt-2.5 space-y-2">
          {keyFeatures.map((feature, index) => (
            <li key={index} className="text-[15px] text-secondary">
              {feature}
            </li>
          ))}
        </ul>
      </Motion.div>

      {/* ── Tech Stack ── */}
      <Motion.div className="card" {...cardAnimation} transition={{ ...cardAnimation.transition, delay: 0.05 }}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          Tech Stack
        </h3>
        <ul className="pl-[18px] pt-2.5 space-y-2">
          {techStack.map((tech, index) => (
            <li key={index} className="text-[15px] text-secondary">
              {tech}
            </li>
          ))}
        </ul>
      </Motion.div>

      {/* ── Authentication Flow ── */}
      <Motion.div className="card" {...cardAnimation}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          Authentication Flow
        </h3>
        <ol className="pl-[18px] pt-2.5 space-y-2">
          {authenticationFlow.map((step, index) => (
            <li key={index} className="text-[15px] text-secondary">
              {step}
            </li>
          ))}
        </ol>
      </Motion.div>

      {/* ── Demo Notice ── */}
      <Motion.div className="card" {...cardAnimation}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          Demo Notice ⚠️
        </h3>
        <p className="text-[15px] text-secondary leading-relaxed">
          This project uses a JSON Server API hosted on a free-tier service.{" "}
          <strong className="text-primary">
            User registrations, logins, and profile edits are not permanently stored.
          </strong>{" "}
          Data may reset when the API restarts, sleeps due to inactivity, or is redeployed.
        </p>
        <p className="text-[15px] text-secondary leading-relaxed mt-3">
          You can freely register and test the application, but{" "}
          <strong className="text-primary">
            your data will not be stored permanently
          </strong>
          .
        </p>
      </Motion.div>

      {/* ── Demo User ── */}
      <Motion.div className="card" {...cardAnimation}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          🧪 Demo User (Always Available After Reset)
        </h3>
        <p className="text-[15px] text-secondary mb-3">
          You can use the following pre-seeded demo account to test login functionality:
        </p>
        <pre className="text-sm text-primary bg-surface-alt border border-subtle rounded-lg p-4 mt-2">
          {`id: 0\nname: Demo User\nmobile: 9999999999\npassword: demo123`}
        </pre>
      </Motion.div>

      {/* ── Project Scope ── */}
      <Motion.div className="card" {...cardAnimation}>
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          Project Scope
        </h3>
        <p className="text-[15px] text-secondary leading-relaxed">
          This project is intentionally frontend-only. It does not use backend
          authentication, databases, JWTs, cookies, or sessions. The focus is on
          learning routing architecture and authentication logic in React.
        </p>
      </Motion.div>

      {/* ── What's Coming Next ── */}
      <Motion.div
        className="card"
        style={{ borderColor: "rgba(77,163,255,0.12)" }}
        {...cardAnimation}
      >
        <h3 className="text-[20px] font-semibold mb-3 text-primary">
          🚀 What&apos;s Coming Next
        </h3>
        <p className="text-[15px] text-secondary mb-5">
          Planned upgrades to evolve SecureAuth into a portfolio-grade, SaaS-level
          authentication system.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futurePlans.map((plan, index) => (
            <Motion.div
              key={index}
              className="future-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.01 }}
            >
              <span className="text-[22px] leading-none shrink-0 mt-0.5">
                {plan.emoji}
              </span>
              <div>
                <h4 className="text-[14px] font-semibold mb-1.5 text-primary tracking-tight">
                  {plan.title}
                </h4>
                <p className="text-[13px] text-muted leading-[1.55]">
                  {plan.desc}
                </p>
              </div>
            </Motion.div>
          ))}
        </div>
      </Motion.div>

      {/* ── CTA ── */}
      <Motion.div
        className="max-w-[700px] text-center text-[15px] text-muted pb-4"
        {...cardAnimation}
      >
        <p>
          <NavLink
            to="/login"
            className="text-sky-500 hover:text-sky-400 transition-colors duration-200"
          >
            {" "}Log in{" "}
          </NavLink>
          or{" "}
          <NavLink
            to="/register"
            className="text-sky-500 hover:text-sky-400 transition-colors duration-200"
          >
            {" "}register{" "}
          </NavLink>
          to explore authenticated features and understand practical frontend
          authentication workflows.
        </p>
      </Motion.div>
    </Motion.section>
  );
}
