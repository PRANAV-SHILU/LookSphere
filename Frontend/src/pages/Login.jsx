import { useEffect } from "react";
import { Form, useActionData, useNavigation, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Motion.div
        className="form-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Form method="post">
          <h1
            className="text-center text-2xl font-bold text-sky-400"
            style={{ textShadow: "0 0 6px rgba(56,189,248,0.5), 0 2px 8px rgba(0,0,0,0.6)" }}
          >
            Login
          </h1>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              placeholder="Enter your registered mobile number"
              className="form-input"
              {...register("mobile")}
            />
            <p className="error-msg">{errors.mobile?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input"
              {...register("password")}
            />
            <p className="error-msg">{errors.password?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Motion.button
              type="submit"
              className="btn-primary"
              disabled={!isValid || isSubmitting}
              whileHover={isValid && !isSubmitting ? { scale: 1.01 } : {}}
              whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </Motion.button>
          </div>

          <h3 className="text-center text-sm text-muted mt-4">
            Haven&apos;t registered :{" "}
            <NavLink
              to="/register"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-200"
            >
              Register
            </NavLink>
          </h3>
        </Form>
      </Motion.div>
    </Motion.section>
  );
}
