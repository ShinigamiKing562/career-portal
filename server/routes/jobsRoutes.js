import express from "express";
import { fetchJobs, fetchJob } from "../controllers/jobsController.js";

const router = express.Router();

router.get("/", fetchJobs);
router.get("/:id", fetchJob);

export default router;
