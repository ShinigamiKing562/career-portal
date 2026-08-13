import { body } from "express-validator";

export const createJobValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isLength({ max: 50 })
    .withMessage("Department must not exceed 50 characters"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 50 })
    .withMessage("Location must not exceed 50 characters"),

  body("employmentType")
    .trim()
    .notEmpty()
    .withMessage("Employment type is required")
    .isIn([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Temporary",
      "Remote",
    ])
    .withMessage("Invalid employment type"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("requirements")
    .trim()
    .notEmpty()
    .withMessage("Requirements are required"),

  body("salary")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Salary must not exceed 50 characters"),

  body("deadline")
    .notEmpty()
    .withMessage("Deadline is required")
    .isISO8601()
    .withMessage("Deadline must be a valid date"),

  body("status")
    .optional()
    .isIn(["Open", "Closed"])
    .withMessage("Status must be either Open or Closed"),
];

export const updateJobValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters"),

  body("department")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Department must not exceed 50 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Location must not exceed 50 characters"),

  body("employmentType")
    .optional()
    .isIn([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Temporary",
      "Remote",
    ])
    .withMessage("Invalid employment type"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("requirements")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Requirements cannot be empty"),

  body("salary")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Salary must not exceed 50 characters"),

  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Deadline must be a valid date"),

  body("status")
    .optional()
    .isIn(["Open", "Closed"])
    .withMessage("Status must be either Open or Closed"),
];
