import { Form, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/RegisterSchema";
import { toast } from "react-toastify";
import { useActionData } from "react-router-dom";
import { useEffect } from "react";

export default function Edit() {
  const user = useLoaderData();
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
    <section className="login-section">
      <Form method="post" className="form">
        <h1>Edit Your Details</h1>
        <div className="input-container">
          <label>Name:</label>
          <input type="text" {...register("name")} />
          <p className="errorMSG">{errors.name?.message}</p>
        </div>

        <div className="input-container">
          <label>Mobile:</label>
          <input type="text" {...register("mobile")} />
          <p className="errorMSG">{errors.mobile?.message}</p>
        </div>

        <div className="input-container">
          <label>Password:</label>
          <input type="password" {...register("password")} />
          <p className="errorMSG">{errors.password?.message}</p>
        </div>

        <div className="input-container">
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          <p className="errorMSG">{errors.confirmPassword?.message}</p>
        </div>

        <div className="input-container">
          <button type="submit" disabled={!isValid}>
            Update
          </button>
        </div>
      </Form>
    </section>
  );
}
