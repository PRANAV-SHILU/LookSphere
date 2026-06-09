import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .lowercase()
    .required("username is required")
    .min(3, "username must be at least 3 characters long")
    .test("no-spaces", "username cannot contain spaces", (value) => !value || !value.includes(" ")),

  password: yup
    .string()
    .required("password is required")
    .trim()
    .test("no-spaces", "password cannot contain spaces", (value) => !value || !value.includes(" "))
    .min(6, "password must be at least 6 characters long"),
});
