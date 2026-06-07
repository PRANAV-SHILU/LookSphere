import * as yup from "yup";

const commonSchema = yup.string().required("This field is required");

export const registerSchema = yup.object({
  name: commonSchema.min(3, "Minimum 3 character long name required").trim(),

  mobile: commonSchema
    .transform((v) => (v ? v.replace(/\s+/g, "") : v))
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),

  password: commonSchema
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Password cannot contain spaces"),

  confirmPassword: commonSchema.oneOf(
    [yup.ref("password")],
    "Passwords must match",
  ),
});
