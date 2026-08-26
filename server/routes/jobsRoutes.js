import express from "express";
import resumeUpload from "../middleware/resumeUpload.js";
import jobImageUpload from "../middleware/jobImageUpload.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import {
  createJobValidation,
  updateJobValidation,
} from "../validators/jobValidator.js";
import { createApplicationValidation, requireResume } from "../validators/applicationValidator.js";
import {
  listJobsController,
  getJobController,
  createJobController,
  updateJobController,
  deleteJobController,
} from "../controllers/jobsController.js";
import {
  listJobApplicationsController,
  createApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", listJobsController);
router.get("/:jobId", getJobController);
router.post(
  "/",
  jobImageUpload.single('image'),
  authenticate,
  authorize("admin"),
  createJobValidation,
  validate,
  createJobController,
);

router.patch(
  "/:jobId",
  jobImageUpload.single('image'),
  authenticate,
  authorize("admin"),
  updateJobValidation,
  validate,
  updateJobController,
);

router.delete("/:jobId", authenticate, authorize("admin"), deleteJobController);

// Nested application routes
// Admin-only: view applications for a job
router.get(
  "/:jobId/applications",
  authenticate,
  authorize("admin"),
  listJobApplicationsController,
);

// Public: submit an application
router.post(
  "/:jobId/applications",
  resumeUpload.single("resume"),
  createApplicationValidation,
  validate,
  requireResume,
  createApplicationController,
);
export default router;

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve all jobs
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 */
/**
 * @swagger
 * /api/jobs/{jobId}:
 *   get:
 *     summary: Retrieve a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/jobs/{jobId}:
 *   patch:
 *     summary: Update an existing job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/jobs/{jobId}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/jobs/{jobId}/applications:
 *   get:
 *     summary: Retrieve all applications for a specific job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/jobs/{jobId}/applications:
 *   post:
 *     summary: Submit an application for a job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Duplicate application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
