import { useEffect } from "react";
import { Form, useActionData, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "../assets/css/form.css";
import { loginSchema } from "../utils/loginSchema";

export default function Login() {
  const actionData = useActionData(); // Errors from loginAction
  const [searchParams, setSearchParams] = useSearchParams(); // Success messages from redirects

  // 🔹 Display success toasts from redirects (register/logout)
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

  // 🔹 Display error toast from login action
  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  // 🔹 Form setup (no need for handleSubmit)
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  return (
    <section className="login-section">
      <Form method="post" className="form">
        <h1>Login</h1>
        <div className="input-container">
          <label>Mobile</label>
          <input
            type="text"
            placeholder="Enter your registered mobile number"
            {...register("mobile")}
          />
          <p className="errorMSG">{errors.mobile?.message}</p>
        </div>

        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <p className="errorMSG">{errors.password?.message}</p>
        </div>

        <div className="input-container">
          <button type="submit" disabled={!isValid}>
            Login
          </button>
        </div>
        <h3>
          Haven't registered : <NavLink to="/register">Register</NavLink>
        </h3>
      </Form>
    </section>
  );
}
