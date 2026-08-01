import pool from "../config/db.js";

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
