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

  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National ID is required")
    .isLength({ max: 50 })
    .withMessage("National ID must not exceed 50 characters"),

  body("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender option"),
  
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 100 })
    .withMessage("Location must not exceed 100 characters"), 

  body("skills")
    .notEmpty()
    .withMessage("Skills are required")
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(parsed)) {
          throw new Error("Skills must be an array");
        }

        if (parsed.length === 0) {
          throw new Error("At least one skill is required");
        }

        return true;
      } catch (error) {
        throw new Error("Skills must be a valid JSON array");
      }
    })
    .customSanitizer((value) => {
      return typeof value === "string" ? JSON.parse(value) : value;
    }),
  
  body("previousPosition")
    .trim()
    .notEmpty()
    .withMessage("Previous position is required")
    .isLength({ max: 100 })
    .withMessage("Previous position must not exceed 100 characters"),

  body("previousWorkplace")
    .trim()
    .notEmpty()
    .withMessage("Previous workplace is required")
    .isLength({ max: 100 })
    .withMessage("Previous workplace must not exceed 100 characters"),

  body("yearsOfExperience")
    .notEmpty()
    .withMessage("Years of experience is required")
    .isInt({ min: 0, max: 100 })
    .withMessage("Years of experience must be a valid number between 0 and 100"),

  body("positionDescription")
    .trim()
    .notEmpty()
    .withMessage("Position description is required")
    .isLength({ max: 500 })
    .withMessage("Position description must not exceed 500 characters"),

  body("highestEducation")
    .trim()
    .notEmpty()
    .withMessage("Highest education is required")
    .isLength({ max: 100 })
    .withMessage("Highest education must not exceed 100 characters"),

  body("major")
    .trim()
    .notEmpty()
    .withMessage("Major is required")
    .isLength({ max: 100 })
    .withMessage("Major must not exceed 100 characters"),

  body("educationInstitution")
    .trim()
    .notEmpty()
    .withMessage("Education institution is required")
    .isLength({ max: 100 })
    .withMessage("Education institution must not exceed 100 characters"),

  body("graduationYear")
    .notEmpty()
    .withMessage("Graduation year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage(
      `Graduation year must be a valid year between 1900 and ${
        new Date().getFullYear() + 10
      }`,
    ),

  body("supportingLinks")
    .optional({ checkFalsy: true })
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(parsed)) {
          throw new Error("Supporting links must be an array");
        }

        return true;
      } catch (error) {
        throw new Error("Supporting links must be a valid JSON array");
      }
    })
    .customSanitizer((value) => {
      return typeof value === "string" ? JSON.parse(value) : value;
    }),

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