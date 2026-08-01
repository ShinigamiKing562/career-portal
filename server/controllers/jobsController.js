import asyncHandler from "../middleware/asyncHandler.js";
import { getJobs, getJob } from "../services/jobsService.js";
import { sendSuccess } from "../utils/response.js";

export const fetchJobs = asyncHandler(async (req, res) => {
  const result = await getJobs(req.query);

  sendSuccess(res, result, "Jobs retrieved successfully");
});

export const fetchJob = asyncHandler(async (req, res) => {
  const job = await getJob(req.params.id);

  sendSuccess(res, job, "Job retrieved successfully");
});
