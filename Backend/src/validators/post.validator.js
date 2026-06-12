import { check } from "express-validator";

export const createPostValidation = [
  check("caption")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("caption cannot exceed 500 characters"),

  check("altText")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("altText cannot exceed 50 characters"),

  check("mediaType")
    .notEmpty()
    .withMessage("mediaType is required")
    .isIn(["Image", "Video"])
    .withMessage("mediaType must be Image or Video"),
];


export const editPostValidation = [
    check("caption")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("caption cannot exceed 500 characters"),

  check("altText")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("altText cannot exceed 50 characters"),
]