import express from "express";
import {
  listJobsController,
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
router.get("/:jobId", getJobController);
router.post("/", createJobController);
router.patch("/:jobId", updateJobController);
router.delete("/:jobId", deleteJobController);

// Nested application routes
router.get("/:jobId/applications", listJobApplicationsController);
router.post("/:jobId/applications", createApplicationController);

export default router;
