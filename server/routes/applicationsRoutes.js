import express from "express";
import {
  listApplicationsController,
  getApplicationController,
  updateApplicationStatusController,
  deleteApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", listApplicationsController);
router.get("/:applicationId", getApplicationController);
router.patch("/:applicationId/status", updateApplicationStatusController);
router.delete("/:applicationId", deleteApplicationController);

export default router;
