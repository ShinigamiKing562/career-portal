import { getAllJobs } from "../models/jobModel.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function fetchJobs(req, res) {
  try {
    const jobs = await getAllJobs();

    sendSuccess(res, jobs, "Jobs retrieved successfully");
  } catch (error) {
    console.error(error);

    sendError(res, 500, "Failed to retrieve jobs");
  }
}
