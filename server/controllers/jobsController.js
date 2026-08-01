import asyncHandler from "../middleware/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobsService.js";

import { sendSuccess } from "../utils/response.js";

// GET /api/jobs
export const listJobsController = asyncHandler(async (req, res) => {
  const result = await listJobs(req.query);

  sendSuccess(res, result, "Jobs retrieved successfully");
});

// GET /api/jobs/:id
export const getJobController = asyncHandler(async (req, res) => {
  const job = await getJob(req.params.id);

  sendSuccess(res, job, "Job retrieved successfully");
});

// POST /api/jobs
export const createJobController = asyncHandler(async (req, res) => {
  const job = await createJob(req.body);

  sendSuccess(res, job, "Job created successfully", HTTP_STATUS.CREATED);
});

// PATCH /api/jobs/:id
export const updateJobController = asyncHandler(async (req, res) => {
  const job = await updateJob(req.params.id, req.body);

  sendSuccess(res, job, "Job updated successfully");
});

// DELETE /api/jobs/:id
export const deleteJobController = asyncHandler(async (req, res) => {
  await deleteJob(req.params.id);

  sendSuccess(res, null, "Job deleted successfully");
});
