import { HTTP_STATUS } from "../constants/httpStatus.js";
import { getAllJobs, getJobById } from "../models/jobModel.js";
import ApiError from "../utils/ApiError.js";

export async function getJobs(filters = {}) {
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

  const allowedSortFields = [
    "created_at",
    "deadline",
    "title",
    "department",
    "location",
  ];

  if (!allowedSortFields.includes(sort)) {
    sort = "created_at";
  }

  order = order.toUpperCase();

  if (!["ASC", "DESC"].includes(order)) {
    order = "DESC";
  }

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

export async function getJob(id) {
  const job = await getJobById(id);

  if (!job) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Job not found");
  }

  return job;
}
