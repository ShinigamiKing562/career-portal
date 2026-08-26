import pool from "../config/db.js";

function mapJob(job) {
  return {
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employment_type,
    description: job.description,
    requirements: job.requirements,
    salary: job.salary,
    currency: job.currency,
    imagePath: job.image_path,
    deadline: job.deadline,
    status: job.status,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
  };
}

// Create Operation

export async function createJob(job) {
  const {
    title,
    department,
    location,
    employmentType,
    description,
    requirements,
    salary,
    currency = "KES",
    imagePath,
    deadline,
    status = "Draft",
  } = job;

  const [result] = await pool.query(
    `
      INSERT INTO jobs (
        title,
        department,
        location,
        employment_type,
        description,
        requirements,
        salary,
        currency,
        image_path,
        deadline,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      department,
      location,
      employmentType,
      description,
      requirements,
      salary,
      currency,
      imagePath,
      deadline,
      status,
    ],
  );

  return getJobById(result.insertId);
}

// Read Operations

export async function getAllJobs({
  page = 1,
  limit = 10,
  search,
  department,
  location,
  employmentType,
  status = "Open",
  sort = "created_at",
  order = "DESC",
}) {
  page = Number(page);
  limit = Number(limit);

  const params = [];
  const where = [];

  if (status) {
    where.push("status = ?");
    params.push(status);
  }

  if (department) {
    where.push("department = ?");
    params.push(department);
  }

  if (location) {
    where.push("location = ?");
    params.push(location);
  }

  if (employmentType) {
    where.push("employment_type = ?");
    params.push(employmentType);
  }

  if (search) {
    const keyword = `%${search}%`;

    where.push(`
      (
        title LIKE ?
        OR description LIKE ?
        OR requirements LIKE ?
      )
    `);

    params.push(keyword, keyword, keyword);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const offset = (page - 1) * limit;

  const jobsSql = `
    SELECT *
    FROM jobs
    ${whereClause}
    ORDER BY ${sort} ${order}
    LIMIT ?
    OFFSET ?
  `;

  const [rows] = await pool.query(jobsSql, [...params, limit, offset]);

  const countSql = `
    SELECT COUNT(*) AS total
    FROM jobs
    ${whereClause}
  `;

  const [[{ total }]] = await pool.query(countSql, params);

  return {
    jobs: rows.map(mapJob),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getJobById(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM jobs
      WHERE id = ?
      LIMIT 1
    `,
    [id],
  );

  return rows.length ? mapJob(rows[0]) : null;
}

// Update Operation

export async function updateJob(id, updates) {
  const fields = [];
  const values = [];

  const columnMap = {
    title: "title",
    department: "department",
    location: "location",
    employmentType: "employment_type",
    description: "description",
    requirements: "requirements",
    salary: "salary",
    currency: "currency",
    deadline: "deadline",
    status: "status",
  };

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || !(key in columnMap)) {
      continue;
    }

    fields.push(`${columnMap[key]} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    return getJobById(id);
  }

  values.push(id);

  await pool.query(
    `
      UPDATE jobs
      SET ${fields.join(", ")}
      WHERE id = ?
    `,
    values,
  );

  return getJobById(id);
}

// Delete Operation

export async function deleteJob(id) {
  const [result] = await pool.query(
    `
      DELETE
      FROM jobs
      WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
}
