import pool from "../config/db.js";

function mapApplication(application) {
  return {
    id: application.id,
    jobId: application.job_id,
    firstName: application.first_name,
    lastName: application.last_name,
    email: application.email,
    phone: application.phone,
    nationalId: application.national_id,
    gender: application.gender,
    location: application.location,
    skills: application.skills,
    previous_position: application.previous_position,
    previous_workplace: application.previous_workplace,
    years_of_experience: application.years_of_experience,
    position_description: application.position_description,
    highest_education: application.highest_education,
    major: application.major,
    education_institution: application.education_institution,
    graduation_year: application.graduation_year,
    supportingLinks: application.supporting_links,
    coverLetter: application.cover_letter,
    resumeFilename: application.resume_filename,
    status: application.status,
    createdAt: application.created_at,
    updatedAt: application.updated_at,
  };
}

// Read Operations

export async function getApplications() {
  const [rows] = await pool.query(`
    SELECT *
    FROM applications
    ORDER BY created_at DESC
  `);

  return rows.map(mapApplication);
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

  return rows.length ? mapApplication(rows[0]) : null;
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

  return rows.map(mapApplication);
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

  return rows.length ? mapApplication(rows[0]) : null;
}

// Create Operation

export async function createApplication(application) {
  const {
    jobId,
    firstName,
    lastName,
    email,
    phone,
    nationalId,
    gender,
    location,
    skills,
    previous_position,
    previous_workplace,
    years_of_experience,
    position_description,
    highest_education,
    major,
    education_institution,
    graduation_year,
    supportingLinks,
    coverLetter,
    resumeFilename,
  } = application;

  const [result] = await pool.query(
    `
      INSERT INTO applications (
        job_id,
        first_name,
        last_name,
        email,
        phone,
        national_id,
        gender,
        location,
        skills,
        previous_position,
        previous_workplace,
        years_of_experience,
        position_description,
        highest_education,
        major,
        education_institution,
        graduation_year,
        supporting_links,
        cover_letter,
        resume_filename
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      jobId,
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      gender,
      location,
      JSON.stringify(skills),
      previous_position,
      previous_workplace,
      years_of_experience,
      position_description,
      highest_education,
      major,
      education_institution,
      graduation_year,
      supportingLinks ? JSON.stringify(supportingLinks) : null,
      coverLetter,
      resumeFilename,
    ],
  );

  return getApplicationById(result.insertId);
}

// Update Operation

export async function updateApplicationStatus(id, status) {
  await pool.query(
    `
      UPDATE applications
      SET status = ?
      WHERE id = ?
    `,
    [status, id],
  );

  return getApplicationById(id);
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
