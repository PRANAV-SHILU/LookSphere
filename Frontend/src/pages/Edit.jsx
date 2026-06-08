import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/RegisterSchema";
import { toast } from "react-toastify";
import { useActionData } from "react-router-dom";
import { useEffect } from "react";
import { motion as Motion } from "framer-motion";

export default function Edit() {
  const user = useLoaderData();
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
          <h2 className="text-center hero-text mb-4">Edit Your Details</h2>

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
            <input
              type="password"
              className="input-field"
              {...register("password")}
            />
            {errors.password && <p style={{ color: "var(--status-error)", fontSize: "0.8rem", marginTop: "0.5rem" }}>{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
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
              {isSubmitting ? "Updating…" : "Update"}
            </Motion.button>
          </div>
        </Form>
      </Motion.div>
    </Motion.section>
  );
}
