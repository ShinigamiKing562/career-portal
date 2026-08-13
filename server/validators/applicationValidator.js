import { body } from "express-validator";

export const createApplicationValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 20 })
    .withMessage("First name must not exceed 20 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 20 })
    .withMessage("Last name must not exceed 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ max: 20 })
    .withMessage("Phone number must not exceed 20 characters")
    .matches(/^[+0-9\s()-]+$/)
    .withMessage("Invalid phone number"),

  body("coverLetter")
    .trim()
    .notEmpty()
    .withMessage("Cover letter is required")
    .isLength({ max: 5000 })
    .withMessage("Cover letter must not exceed 5000 characters"),
];

export function requireResume(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume is required",
    });
  }

  next();
}