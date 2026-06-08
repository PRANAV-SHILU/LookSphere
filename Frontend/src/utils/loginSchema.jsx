import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("email is required")
    .email("email is invalid"),

  password: yup
    .string()
    .required("password is required")
    .trim()
    .test("no-spaces", "password cannot contain spaces", (value) => !value || !value.includes(" "))
    .min(6, "password must be at least 6 characters long"),
});
