import * as yup from "yup";

const commonSchema = yup.string().required("This field is required");

export const registerSchema = yup.object({
  username: commonSchema
    .min(3, "username must be at least 3 characters long")
    .trim()
    .test("no-spaces", "username cannot contain spaces", (value) => !value || !value.includes(" ")),

  email: yup.string()
    .trim()
    .required("email is required")
    .email("email is invalid"),

  password: commonSchema
    .min(6, "password must be at least 6 characters long")
    .test("no-spaces", "password cannot contain spaces", (value) => !value || !value.includes(" ")),

  confirmPassword: commonSchema
    .oneOf([yup.ref("password")], "confirmPassword does not match password"),
});
