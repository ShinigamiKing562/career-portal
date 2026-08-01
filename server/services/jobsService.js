import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  getAllJobs,
  getJobById,
  createJob as createJobModel,
  updateJob as updateJobModel,
  deleteJob as deleteJobModel,
} from "../models/jobModel.js";

import ApiError from "../utils/ApiError.js";

const ALLOWED_SORT_FIELDS = [
  "created_at",
  "deadline",
  "title",
  "department",
  "location",
];

const ALLOWED_ORDER = ["ASC", "DESC"];

// List Jobs
export async function listJobs(filters = {}) {
  let {
    page = 1,
    limit = 10,
    search,
    department,
    location,
    employmentType,
    status = "Open",
    sort = "created_at",
    order = "DESC",
  } = filters;

  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  sort = ALLOWED_SORT_FIELDS.includes(sort) ? sort : "created_at";

  order = order.toUpperCase();

  order = ALLOWED_ORDER.includes(order) ? order : "DESC";

  return getAllJobs({
    page,
    limit,
    search,
    department,
    location,
    employmentType,
    status,
    sort,
    order,
  });
}

// Get Job
export async function getJob(id) {
  const job = await getJobById(id);

  if (!job) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Job not found");
  }

  return job;
}

// Create Job
export async function createJob(jobData) {
  const id = await createJobModel(jobData);

  return getJob(id);
}

// Update Job
export async function updateJob(id, updates) {
  await getJob(id);

  await updateJobModel(id, updates);

  return getJob(id);
}

// Delete Job
export async function deleteJob(id) {
  await getJob(id);

  await deleteJobModel(id);
}
