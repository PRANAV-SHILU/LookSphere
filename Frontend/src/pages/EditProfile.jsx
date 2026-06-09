import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/RegisterSchema";
import { toast } from "react-toastify";
import { useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function EditProfile() {
  const user = useLoaderData();
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
    defaultValues: {
      name: user.name,
      mobile: user.mobile,
      password: user.password,
      confirmPassword: user.password,
    },
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
          <div className="text-center">
            <h2 className="hero-text mb-4">Edit Your Details</h2>
          </div>

          <div className="input-group">
            <label className="input-label">Name</label>
            <input type="text" className="input-field" {...register("name")} />
            {errors.name && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.name.message}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Mobile</label>
            <input type="text" className="input-field" {...register("mobile")} />
            {errors.mobile && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.mobile.message}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
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
            {errors.password && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field"
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
              {isSubmitting ? "Updating…" : "Update"}
            </Motion.button>
          </div>
        </Form>
      </Motion.div>
    </Motion.section>
  );
}
