import { registerSchema } from "../utils/RegisterSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { motion as Motion } from "framer-motion";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  return (
    <Motion.section
      className="flex flex-col justify-center items-center"
      style={{ minHeight: "70vh" }}
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
          <h2 className="text-center hero-text">Create an account</h2>
          <p className="text-center mb-4">Join SecureAuth today</p>

          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-field"
              {...register("username")}
            />
            {errors.username && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.username.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              {...register("email")}
            />
            {errors.email && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              {...register("password")}
            />
            {errors.password && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input-field"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.confirmPassword.message}</p>}
          </div>

          <div className="input-group mt-2">
            <Motion.button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!isValid || isSubmitting}
              whileHover={isValid && !isSubmitting ? { scale: 1.01 } : {}}
              whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? "Registering…" : "Register"}
            </Motion.button>
          </div>

          <p className="text-center mt-4" style={{ fontSize: "0.875rem" }}>
            Already registered?{" "}
            <NavLink to="/login" style={{ fontWeight: 500 }}>
              Login
            </NavLink>
          </p>
        </Form>
      </Motion.div>
    </Motion.section>
  );
}
