import asyncHandler from "../middleware/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  listApplications,
  getApplication,
  listApplicationsByJob,
  submitApplication,
  changeApplicationStatus,
  removeApplication,
} from "../services/applicationsService.js";

import { sendSuccess } from "../utils/response.js";

// GET /api/applications
export const listApplicationsController = asyncHandler(async (req, res) => {
  const applications = await listApplications();

  sendSuccess(res, applications, "Applications retrieved successfully");
});

// GET /api/applications/:applicationId
export const getApplicationController = asyncHandler(async (req, res) => {
  const application = await getApplication(req.params.applicationId);

  sendSuccess(res, application, "Application retrieved successfully");
});

// GET /api/jobs/:jobId/applications
export const listJobApplicationsController = asyncHandler(async (req, res) => {
  const applications = await listApplicationsByJob(req.params.jobId);

  sendSuccess(res, applications, "Applications retrieved successfully");
});

// POST /api/jobs/:jobId/applications
export const createApplicationController = asyncHandler(async (req, res) => {
  const jobId = Number(req.params.jobId);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid job ID");
  }

  const application = await submitApplication({
    jobId,

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    nationalId: req.body.nationalId,
    gender: req.body.gender,
    location: req.body.location,

    skills: req.body.skills,

    previousPosition: req.body.previousPosition,
    previousWorkplace: req.body.previousWorkplace,
    yearsOfExperience: Number(req.body.yearsOfExperience),
    positionDescription: req.body.positionDescription,

    highestEducation: req.body.highestEducation,
    major: req.body.major,
    educationInstitution: req.body.educationInstitution,
    graduationYear: Number(req.body.graduationYear),

    supportingLinks: req.body.supportingLinks,

    coverLetter: req.body.coverLetter,

    resumeFilename: req.file?.filename ?? null,
  });

  sendSuccess(
    res,
    application,
    "Application submitted successfully",
    HTTP_STATUS.CREATED,
  );
});

// PATCH /api/applications/:applicationId/status
export const updateApplicationStatusController = asyncHandler(
  async (req, res) => {
    const application = await changeApplicationStatus(
      req.params.applicationId,
      req.body.status,
    );

    sendSuccess(res, application, "Application status updated successfully");
  },
);

// DELETE /api/applications/:applicationId
export const deleteApplicationController = asyncHandler(async (req, res) => {
  await removeApplication(req.params.applicationId);

  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});
