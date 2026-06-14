import { registerSchema } from "../schema/registerSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Register as RegisterAnimation } from "../utils/animation";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      className="flex mt-8 flex-col justify-center items-center px-4 w-full min-h-[calc(100vh-120px)]"
      {...RegisterAnimation.pageTransition}
    >
      <Motion.div
        className="card w-full max-w-md py-4 px-0 xsm:p-8 4xl:max-w-xl 4xl:p-14 4xl:rounded-2xl"
        {...RegisterAnimation.cardTransition}
      >
        <Form method="post">
          <div className="text-center">
            <h2 className="hero-text mx-auto text-2xl xsm:text-4xl 4xl:text-5xl font-extrabold mb-3">Create an account</h2>
            <p className="mb-8  text-sm xsm:text-base 4xl:text-xl ">Join SecureAuth today</p>
          </div>

          <div className="input-group">
            <label htmlFor="username" className="input-label text-xs xsm:text-sm 4xl:text-lg">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
              autoComplete="username"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              {...register("username")}
            />
            {errors.username && <p className="text-xs 4xl:text-base mt-1.5" style={{ color: "var(--status-error)" }}>{errors.username.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label text-xs xsm:text-sm 4xl:text-lg">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
              autoComplete="email"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              {...register("email")}
            />
            {errors.email && <p className="text-xs 4xl:text-base mt-1.5" style={{ color: "var(--status-error)" }}>{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label text-xs xsm:text-sm 4xl:text-lg">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
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
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs 4xl:text-base mt-1.5" style={{ color: "var(--status-error)" }}>{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label text-xs xsm:text-sm 4xl:text-lg">Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
                {...register("confirmPassword")}
                style={{ paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
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
                  padding: 0
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs 4xl:text-base mt-1.5" style={{ color: "var(--status-error)" }}>{errors.confirmPassword.message}</p>}
          </div>

          <div className="input-group mt-2">
            <Motion.button
              type="submit"
              className="btn btn-primary w-full py-2 px-4 xsm:py-2.5 4xl:py-4.5 4xl:text-xl 4xl:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isValid || isSubmitting}
              whileHover={isValid && !isSubmitting ? RegisterAnimation.buttonHover : {}}
              whileTap={isValid && !isSubmitting ? RegisterAnimation.buttonTap : {}}
            >
              {isSubmitting ? "Registering…" : "Register"}
            </Motion.button>
          </div>

          <p className="text-center mt-4 xsm:mt-6 text-xs xsm:text-sm 4xl:text-lg">
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
