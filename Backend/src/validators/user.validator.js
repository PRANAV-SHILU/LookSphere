import { check } from "express-validator";

export const updateProfileValidation = [
  check("username")
    .optional()
    .trim()
    .toLowerCase()
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters long")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("username cannot contain spaces");
      }
      return true;
    }),

  check("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("email is invalid"),

  check("tagline")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("tagline cannot exceed 100 characters"),

  check("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("bio cannot exceed 500 characters"),
];
