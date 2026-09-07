import { check } from "express-validator";

export const updateProfileValidation = [
  check("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters long")
    .custom((value) => {
      if (/[A-Z]/.test(value)) {
        throw new Error("username cannot contain capital letters");
      }
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
    .isLength({ max: 80 })
    .withMessage("tagline cannot exceed 80 characters"),

  check("bio")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("bio cannot exceed 300 characters"),
];

export const changePasswordValidation = [
  check("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),

  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Password cannot contain spaces");
      }
      return true;
    })
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
    ),
];

export const changeEmailSchema = [
  check("newEmail").trim().toLowerCase().isEmail().withMessage("email is invalid"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),
];
