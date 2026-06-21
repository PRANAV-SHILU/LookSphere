import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, NavLink } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../schema/loginSchema";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  useDocumentMetadata("Login");
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

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      const noSpaceFields = ["username", "password"];
      if (noSpaceFields.includes(e.target.name)) {
        e.preventDefault();
      }
    }

    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      const form = e.currentTarget;
      const inputs = Array.from(form.querySelectorAll("input:not([type='hidden'])"));
      const index = inputs.indexOf(e.target);
      
      if (index > -1 && index < inputs.length - 1) {
        e.preventDefault();
        // Only go to next input if current one has a value and no error
        const fieldName = e.target.name;
        if (e.target.value.trim() !== "" && !errors[fieldName]) {
          inputs[index + 1].focus();
        }
      }
    }
  };

  return (
    <section
      className="flex flex-col mt-4 justify-center items-center px-4 w-full min-h-[calc(100vh-120px)]"
    >
      <div
        className="card w-full max-w-md px-4! py-8! xsm:p-8! 4xl:max-w-xl 4xl:p-14! 4xl:rounded-2xl"
      >
        <Form method="post" onKeyDown={handleKeyDown}>
          <div className="text-center">
            <h2 className="hero-text text-3xl xsm:text-4xl 4xl:text-5xl font-extrabold mb-3 bg-linear-to-r from-(--primary-500) to-purple-500 bg-clip-text text-transparent">Welcome back</h2>
            <p className="mb-6 xsm:mb-6 text-sm xsm:text-base 4xl:text-xl 4xl:mb-8">Sign in to your account</p>
          </div>

          <div className="input-group">
            <label className="input-label text-xs xsm:text-sm 4xl:text-lg">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
              autoComplete="username"
              {...register("username")}
            />
            {errors.username && (
              <p
                className="text-xs 4xl:text-base mt-1.5"
                style={{
                  color: "var(--status-error)"
                }}
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label text-xs xsm:text-sm 4xl:text-lg">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input-field text-sm xsm:text-base 4xl:text-xl 4xl:py-4 4xl:px-6 4xl:rounded-lg"
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
                className="text-xs 4xl:text-base mt-1.5"
                style={{
                  color: "var(--status-error)"
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="input-group mt-2">
            <button
              type="submit"
              className="btn btn-primary w-full py-2 px-4 xsm:py-2.5 4xl:py-4.5 4xl:text-xl 4xl:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 hover:scale-[1.02]"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </button>
          </div>

          <p className="text-center mt-4 xsm:mt-6 text-xs xsm:text-sm 4xl:text-lg">
            Don't have an account?{" "}
            <NavLink to="/register" style={{ fontWeight: 500 }}>
              Register
            </NavLink>
          </p>
        </Form>
      </div>
    </section>
  );
}
