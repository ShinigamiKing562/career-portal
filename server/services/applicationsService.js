import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  getApplications,
  getApplicationById,
  getApplicationsByJob,
  getApplicationByJobAndEmail,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../models/applicationModel.js";

import { getJobById } from "../models/jobModel.js";

import ApiError from "../utils/ApiError.js";

export async function listApplications() {
  return getApplications();
}

export async function getApplication(id) {
  const application = await getApplicationById(id);

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  return application;
}

export async function listApplicationsByJob(jobId) {
  return getApplicationsByJob(jobId);
}

export async function submitApplication(application) {
  const job = await getJobById(application.jobId);

  if (!job) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Job not found");
  }

  if (job.status !== "Open") {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "This position is no longer accepting applications.",
    );
  }

  const existing = await getApplicationByJobAndEmail(
    application.jobId,
    application.email,
  );

  if (existing) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "You have already applied for this position.",
    );
  }

  const id = await createApplication(application);

  return getApplicationById(id);
}

export async function changeApplicationStatus(id, status) {
  const application = await getApplicationById(id);

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  await updateApplicationStatus(id, status);

  return getApplicationById(id);
}

export async function removeApplication(id) {
  const application = await getApplicationById(id);

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  await deleteApplication(id);
}
