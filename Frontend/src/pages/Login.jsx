import { useEffect } from "react";
import { Form, useActionData, useNavigation, useSearchParams, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/loginSchema";
import { motion as Motion } from "framer-motion";

export default function Login() {
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (searchParams.get("registered") === "success") {
      toast.success("Registration successful. Please log in.");
      setSearchParams({});
    }
    if (searchParams.get("logout") === "success") {
      toast.success("Logged out successfully.");
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

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
        className="card w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Form method="post">
          <h2 className="text-center hero-text">Welcome back</h2>
          <p className="text-center mb-4">Sign in to your account</p>

          <div className="input-group">
            <label className="input-label">Mobile</label>
            <input
              type="text"
              placeholder="Enter your registered mobile number"
              className="input-field"
              {...register("mobile")}
            />
            {errors.mobile && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.mobile.message}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              {...register("password")}
            />
            {errors.password && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.password.message}</p>}
          </div>

          <div className="input-group mt-2">
            <Motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!isValid || isSubmitting}
              whileHover={isValid && !isSubmitting ? { scale: 1.01 } : {}}
              whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </Motion.button>
          </div>

          <p className="text-center mt-4" style={{ fontSize: "0.875rem" }}>
            Don't have an account?{" "}
            <NavLink to="/register" style={{ fontWeight: 500 }}>
              Register
            </NavLink>
          </p>
        </Form>
      </Motion.div>
    </Motion.section>
  );
}
