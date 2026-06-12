import * as yup from "yup";

export const postSchema = yup.object({
  caption: yup
    .string()
    .trim()
    .max(500, "Caption cannot exceed 500 characters"),

  altText: yup
    .string()
    .trim()
    .max(50, "Alt text cannot exceed 50 characters"),
});
