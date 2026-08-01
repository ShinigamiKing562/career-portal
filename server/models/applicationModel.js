import pool from "../config/db.js";

// Read Operations

export async function getApplications() {
  const [rows] = await pool.query(`
    SELECT *
    FROM applications
    ORDER BY created_at DESC
  `);

  return rows;
}

export async function getApplicationById(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM applications
      WHERE id = ?
      LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}

export async function getApplicationsByJob(jobId) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM applications
      WHERE job_id = ?
      ORDER BY created_at DESC
    `,
    [jobId],
  );

  return rows;
}

export async function getApplicationByJobAndEmail(jobId, email) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM applications
      WHERE job_id = ?
        AND email = ?
      LIMIT 1
    `,
    [jobId, email],
  );

  return rows[0] ?? null;
}

// Create Operation

export async function createApplication(application) {
  const { jobId, firstName, lastName, email, phone, coverLetter, resumePath } =
    application;

  const [result] = await pool.query(
    `
      INSERT INTO applications (
        job_id,
        first_name,
        last_name,
        email,
        phone,
        cover_letter,
        resume_path
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [jobId, firstName, lastName, email, phone, coverLetter, resumePath],
  );

  return result.insertId;
}

// Update Operation

export async function updateApplicationStatus(id, status) {
  const [result] = await pool.query(
    `
      UPDATE applications
      SET status = ?
      WHERE id = ?
    `,
    [status, id],
  );

  return result.affectedRows;
}

// Delete Operation

export async function deleteApplication(id) {
  const [result] = await pool.query(
    `
      DELETE FROM applications
      WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
