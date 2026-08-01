import pool from "../config/db.js";

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
    deadline,
    status = "Open",
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
        deadline,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      department,
      location,
      employmentType,
      description,
      requirements,
      salary,
      deadline,
      status,
    ],
  );

  return result.insertId;
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

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const offset = (page - 1) * limit;

  const jobsSql = `
    SELECT *
    FROM jobs
    ${whereClause}
    ORDER BY ${sort} ${order}
    LIMIT ?
    OFFSET ?
  `;

  const jobsParams = [...params, limit, offset];

  const [jobs] = await pool.query(jobsSql, jobsParams);

  const countSql = `
    SELECT COUNT(*) AS total
    FROM jobs
    ${whereClause}
  `;

  const [[{ total }]] = await pool.query(countSql, params);

  return {
    jobs,
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

  return rows[0] ?? null;
}

//Update Operation
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
    return 0;
  }

  values.push(id);

  const [result] = await pool.query(
    `
      UPDATE jobs
      SET ${fields.join(", ")}
      WHERE id = ?
    `,
    values,
  );

  return result.affectedRows;
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