import express from "express";
import resumeUpload from "../middleware/resumeUpload.js";
import jobImageUpload from "../middleware/jobImageUpload.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import {
  createJobValidation,
  updateJobValidation,
} from "../validators/jobValidator.js";
import { createApplicationValidation, requireResume } from "../validators/applicationValidator.js";
import {
  listJobsController,
  getJobByTitleController,
  getJobController,
  createJobController,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";
import {
  listJobApplicationsController,
  createApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", listJobsController);
router.get("/title/:title", getJobByTitleController);
router.get("/:jobId", getJobController);
router.post(
  "/",
  jobImageUpload.single('image'),
  authenticate,
  authorize("admin"),
  createJobValidation,
  validate,
  createJobController,
);

router.patch(
  "/:jobId",
  jobImageUpload.single('image'),
  authenticate,
  authorize("admin"),
  updateJobValidation,
  validate,
  updateJobController,
);

router.delete("/:jobId", authenticate, authorize("admin"), deleteJobController);

// Nested application routes
// Admin-only: view applications for a job
router.get(
  "/:jobId/applications",
  authenticate,
  authorize("admin"),
  listJobApplicationsController,
);

// Public: submit an application
router.post(
  "/:jobId/applications",
  resumeUpload.single("resume"),
  createApplicationValidation,
  validate,
  requireResume,
  createApplicationController,
);
export default router;