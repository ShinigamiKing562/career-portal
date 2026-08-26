import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import {
  listApplicationsController,
  getApplicationController,
  updateApplicationStatusController,
  deleteApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", listApplicationsController);
router.get("/:applicationId", getApplicationController);
router.patch("/:applicationId/status", updateApplicationStatusController);
router.delete("/:applicationId", deleteApplicationController);

export default router;