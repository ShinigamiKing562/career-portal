import pool from "../config/db.js";

export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email],
  );

  return rows[0] ?? null;
}

export async function getUserById(id) {
  const [rows] = await pool.query(
    `
      SELECT
        id,
        first_name,
        last_name,
        email,
        role,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [id],
  );

  return rows[0] ?? null;
}
