import { useEffect } from "react";
import { Form, useLoaderData, useSearchParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { motion as Motion } from "framer-motion";

export default function Dashboard() {
  const user = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("loggedin") === "success") {
      toast.success("Logged in successfully!");
      setSearchParams({});
    }
    if (searchParams.get("edited") === "success") {
      toast.success("User details updated successfully!");
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  if (!user) return <h2 className="text-center text-muted">Loading user data...</h2>;

  return (
    <Motion.section
      className="flex flex-col justify-center items-center"
      style={{ minHeight: "60vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Motion.div
        className="card w-full max-w-md text-center"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1 className="hero-text mb-2">Dashboard</h1>
        <h2 className="mb-4" style={{ fontSize: "1.125rem", color: "var(--text-muted)" }}>
          Welcome back, {user.name}
        </h2>

        <Motion.div
          className="mb-4"
          style={{ backgroundColor: "var(--surface-input)", padding: "1.5rem", borderRadius: "var(--radius-md)", textAlign: "left" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <p className="mb-2" style={{ fontSize: "0.875rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Name:</strong> {user.name}
          </p>
          <p className="mb-2" style={{ fontSize: "0.875rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Mobile:</strong> {user.mobile}
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: 0 }}>
            <strong style={{ color: "var(--text-primary)" }}>ID:</strong> {user.id}
          </p>
        </Motion.div>

        <Motion.div
          className="flex justify-center gap-4 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <NavLink to="/edit" className="btn btn-secondary">
            Edit Details
          </NavLink>

          <Form method="post">
            <button type="submit" className="btn btn-danger">
              Logout
            </button>
          </Form>
        </Motion.div>
      </Motion.div>
    </Motion.section>
  );
}
