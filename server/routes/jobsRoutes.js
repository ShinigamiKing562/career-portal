//Imports
import express from "express";
import {
  listJobsController,
  getJobController,
  createJobController,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";
import {
  createApplicationController,
  getApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

//Endpoints
router.get("/", listJobsController);
router.get("/:id", getJobController);
router.post("/", createJobController);
router.patch("/:id", updateJobController);
router.delete("/:id", deleteJobController);
router.post("/:id/applications", createApplicationController);
router.get("/:id/applications", getApplicationController);

export default router;
