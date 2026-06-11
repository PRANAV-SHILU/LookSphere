import * as yup from "yup";

export const editProfileSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .lowercase()
    .test("no-spaces", "Username cannot contain spaces", (value) => !value || !value.includes(" ")),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),

  tagline: yup
    .string()
    .trim()
    .max(80, "Tagline cannot exceed 80 characters"),

  bio: yup
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters"),
});
