import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import {
  listApplicationsController,
  getApplicationController,
  updateApplicationStatusController,
  deleteApplicationController,
} from "../controllers/applicationsController.js";
import cors from "cors";

const router = express.Router();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", listApplicationsController);
router.get("/:applicationId", getApplicationController);
router.patch("/:applicationId/status", updateApplicationStatusController);
router.delete("/:applicationId", deleteApplicationController);

export default router;