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

// GET /api/applications/:id
export const getApplicationController = asyncHandler(async (req, res) => {
  const application = await getApplication(req.params.id);

  sendSuccess(res, application, "Application retrieved successfully");
});

// GET /api/jobs/:jobId/applications
export const listJobApplicationsController = asyncHandler(async (req, res) => {
  const applications = await listApplicationsByJob(req.params.jobId);

  sendSuccess(res, applications, "Applications retrieved successfully");
});

// POST /api/jobs/:id/applications
export const createApplicationController = asyncHandler(async (req, res) => {
  const application = await submitApplication({
    ...req.body,
    jobId: req.params.id,
  });

  sendSuccess(
    res,
    application,
    "Application submitted successfully",
    HTTP_STATUS.CREATED,
  );
});

// PATCH /api/applications/:id/status
export const updateApplicationStatusController = asyncHandler(
  async (req, res) => {
    const application = await changeApplicationStatus(
      req.params.id,
      req.body.status,
    );

    sendSuccess(res, application, "Application status updated successfully");
  },
);

// DELETE /api/applications/:id
export const deleteApplicationController = asyncHandler(async (req, res) => {
  await deleteApplication(req.params.id);

  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});
