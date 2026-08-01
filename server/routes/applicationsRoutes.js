import express from "express";
import {
  listApplicationsController,
  getApplicationController,
  updateApplicationStatusController,
  deleteApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", listApplicationsController);
router.get("/:id", getApplicationController);
router.patch("/:id/status", updateApplicationStatusController);
router.delete("/:id", deleteApplicationController);

export default router;
