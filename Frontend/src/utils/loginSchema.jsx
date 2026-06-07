import * as yup from "yup";

export const loginSchema = yup.object({
  mobile: yup
    .string()
    .required("This field is required")
    .trim()
    .transform((v) => (v ? v.replace(/\s+/g, "") : v))
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),

  password: yup
    .string()
    .required("This field is required")
    .trim()
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(6, "Password must be at least 6 characters"),
});
