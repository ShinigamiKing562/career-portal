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

import { getJob } from "./jobsService.js";

import ApiError from "../utils/ApiError.js";

const ALLOWED_STATUS = [
  "Submitted",
  "Under Review",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const formatApplication = (application) => {
  if (!application) return null;

  return {
    ...application,
    resumeUrl: application.resumeFilename
      ? `/uploads/resumes/${application.resumeFilename}`
      : null,
  };
};

export async function listApplications() {
  const applications = await getApplications();

  return applications.map(formatApplication);
}

export async function getApplication(id) {
  const application = await getApplicationById(id);

  if (!application) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Application not found");
  }

  return formatApplication(application);
}

export async function listApplicationsByJob(jobId) {
  const applications = await getApplicationsByJob(jobId);

  return applications.map(formatApplication);
}

export async function submitApplication(application) {
  const job = await getJob(application.jobId);

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

  return getApplication(id);
}

export async function changeApplicationStatus(id, status) {
  const application = await getApplication(id);

  if (!ALLOWED_STATUS.includes(status)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid application status");
  }

  return updateApplicationStatus(id, status);
}

export async function removeApplication(id) {
  await getApplication(id);

  await deleteApplication(id);
}
