import { check } from "express-validator";

export const createPostValidation = [
  check("caption")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("caption cannot exceed 500 characters"),

  check("mediaType")
    .notEmpty()
    .withMessage("mediaType is required")
    .isIn(["image", "video"])
    .withMessage("mediaType must be image or video"),
];
