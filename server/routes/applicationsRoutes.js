import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import {
  listApplicationsController,
  getApplicationController,
  updateApplicationStatusController,
  deleteApplicationController,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", listApplicationsController);
router.get("/:applicationId", getApplicationController);
router.patch("/:applicationId/status", updateApplicationStatusController);
router.delete("/:applicationId", deleteApplicationController);

export default router;

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Retrieve all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/applications/{applicationId}:
 *   get:
 *     summary: Retrieve an application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: ID of the application
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application retrieved successfully
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/applications/{applicationId}/status:
 *   patch:
 *     summary: Update an application's status
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: ID of the application
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: Under Review
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Invalid status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/applications/{applicationId}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         description: ID of the application
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Application deleted successfully
 *       404:
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
