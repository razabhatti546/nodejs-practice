import bcrypt from "bcrypt";
import { query } from "../config/db.js";
import AppError from "../utils/AppError.js";

export const signUp = async ({ username, email, password_hash }) => {
  const existingEmail = await query(`SELECT id FROM users WHERE email = $1`, [
    email,
  ]);
  if (existingEmail.rows.length > 0) {
    throw new AppError("Email already exists", 409);
  }

  const existingUsername = await query(
    `SELECT id FROM users WHERE username = $1`,
    [username],
  );
  if (existingUsername.rows.length > 0) {
    throw new AppError("Username already exists", 409);
  }

  try {
    const result = await query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, password_hash],
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("Email or username already exists", 409);
    }

    throw error;
  }
};

export const signIn = async ({ email, password }) => {
  const result = await query(
    `SELECT id, username, email, password_hash FROM users WHERE email = $1`,
    [email],
  );
  const user = result.rows[0];
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }
  return { id: user.id, username: user.username, email: user.email };
};

export const findUserById = async (id) => {
  const result = await query(
    `SELECT id, username, email FROM users WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};
