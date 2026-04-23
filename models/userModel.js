import { query } from "../config/db.js";

export const getAllUsers = async () => {
  const result = await query(
    "SELECT id, username, email FROM users ORDER BY id ASC",
  );
  return result.rows;
};

export const createUser = async ({ username, email, password_hash }) => {
  const result = await query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, password_hash],
  );

  return result.rows[0];
};

export const getUserById = async (id) => {
  const result = await query(
    `SELECT id, username, email FROM users WHERE id = $1`,
    [id],
  );
  return result.rows[0];
};

export const updateUser = async (id, { username, email, password_hash }) => {
  const result = await query(
    `UPDATE users
     SET username = $1, email = $2, password_hash = $3
     WHERE id = $4
     RETURNING id, username, email`,
    [username, email, password_hash, id],
  );

  return result.rows[0];
};

export const deleteUser = async (id) => {
  const result = await query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING id, username, email`,
    [id],
  );

  return result.rows[0];
};
