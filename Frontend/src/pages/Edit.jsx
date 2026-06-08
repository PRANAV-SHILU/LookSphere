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
            Edit Your Details
          </h1>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Name:</label>
            <input type="text" className="form-input" {...register("name")} />
            <p className="error-msg">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Mobile:</label>
            <input type="text" className="form-input" {...register("mobile")} />
            <p className="error-msg">{errors.mobile?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-input"
              {...register("password")}
            />
            <p className="error-msg">{errors.password?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-input"
              {...register("confirmPassword")}
            />
            <p className="error-msg">{errors.confirmPassword?.message}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Motion.button
              type="submit"
              className="btn-primary"
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
