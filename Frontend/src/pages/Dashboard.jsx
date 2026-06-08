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

  if (!user) return <h1 className="text-center text-secondary">Loading user data...</h1>;

  return (
    <Motion.section
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Motion.div
        className="dashboard-card w-full"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Heading */}
        <h1
          className="text-[24px] font-bold mb-1.5 text-primary"
          style={{ textShadow: "0 2px 6px rgba(56,189,248,0.3)" }}
        >
          Dashboard
        </h1>
        <h2 className="text-base font-normal text-muted mb-7">
          Welcome {user.name}!
        </h2>

        {/* User details */}
        <Motion.div
          className="user-details-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          <p className="my-2.5 text-sm text-secondary">
            <strong className="text-primary">Name:</strong> {user.name}
          </p>
          <p className="my-2.5 text-sm text-secondary">
            <strong className="text-primary">Mobile:</strong> {user.mobile}
          </p>
          <p className="my-2.5 text-sm text-secondary">
            <strong className="text-primary">ID:</strong> {user.id}
          </p>
        </Motion.div>

        {/* Action buttons */}
        <Motion.div
          className="flex gap-3.5 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <NavLink to="/edit">
            <Motion.button
              className="btn-action"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Edit Details
            </Motion.button>
          </NavLink>

          <Form method="post">
            <Motion.button
              type="submit"
              className="btn-muted"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Logout
            </Motion.button>
          </Form>
        </Motion.div>
      </Motion.div>
    </Motion.section>
  );
}
