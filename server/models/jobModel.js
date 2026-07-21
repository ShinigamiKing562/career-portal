import pool from "../config/db.js";

export async function getAllJobs() {
  const [rows] = await pool.query(
    "SELECT * FROM jobs WHERE status = 'Open' ORDER BY created_at DESC",
  );

  return rows;
}
