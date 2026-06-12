import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../schema/loginSchema";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Login as LoginAnimation } from "../utils/animation";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);

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
      {...LoginAnimation.pageTransition}
    >
      <Motion.div
        className="card w-full max-w-md"
        {...LoginAnimation.cardTransition}
      >
        <Form method="post">
          <div className="text-center">
            <h2 className="hero-text">Welcome back</h2>
            <p className="mb-4">Sign in to your account</p>
          </div>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-field"
              autoComplete="username"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              {...register("username")}
            />
            {errors.username && (
              <p
                style={{
                  color: "var(--status-error)",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input-field"
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
                {...register("password")}
                style={{ paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p
                style={{
                  color: "var(--status-error)",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="input-group mt-2">
            <Motion.button
              type="submit"
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isValid || isSubmitting}
              whileHover={isValid && !isSubmitting ? LoginAnimation.buttonHover : {}}
              whileTap={isValid && !isSubmitting ? LoginAnimation.buttonTap : {}}
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
