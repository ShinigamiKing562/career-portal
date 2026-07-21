import { getAllJobs } from "../models/jobModel.js";

export async function fetchJobs(req, res) {
  try {
    const jobs = await getAllJobs();

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
}
