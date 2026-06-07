import { registerSchema } from "../utils/RegisterSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, NavLink } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Register() {
  const actionData = useActionData();

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
    <section className="login-section">
      <Form method="post" className="form">
        <h1>Register</h1>
        <div className="input-container">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            placeholder="Enter your name, ex: Pranav Shilu"
            {...register("name")}
          />
          <p className="errorMSG">{errors.name?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="mobile">Mobile : </label>
          <input
            type="text"
            placeholder="Enter your mobile number, ex: 1234567891"
            {...register("mobile")}
          />
          <p className="errorMSG">{errors.mobile?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <p className="errorMSG">{errors.password?.message}</p>
        </div>

        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password : </label>
          <input
            type="password"
            placeholder="confirm your Password"
            {...register("confirmPassword")}
          />
          <p className="errorMSG">{errors.confirmPassword?.message}</p>
        </div>

        <div className="input-container">
          <button type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
        <h3>
          Already registered : <NavLink to="/login">Login</NavLink>
        </h3>
      </Form>
    </section>
  );
}
