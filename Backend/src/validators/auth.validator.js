import { check } from "express-validator";

export const registerValidation = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
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
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("email cannot contain spaces");
      }
      return true;
    }),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("password cannot contain spaces");
      }
      return true;
    })
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  check("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("confirmPassword is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirmPassword does not match password");
      }
      return true;
    }),
];

export const loginValidation = [
  check("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("email cannot contain spaces");
      }
      return true;
    }),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("password cannot contain spaces");
      }
      return true;
    })
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
];