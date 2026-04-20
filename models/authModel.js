const db = require("../config/db");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const signUp = async ({ username, email, password_hash }) => {
  const existingemail = await db.query(`SELECT id FROM users WHERE email = $1`, [
    email,
  ]);
  if (existingemail.rows.length > 0) {
    throw new AppError("Email already exists", 409);
  }

  const existingusername = await db.query(
    `SELECT id FROM users WHERE username = $1`,
    [username],
  );
  if (existingusername.rows.length > 0) {
    throw new AppError("Username already exists", 409);
  }

  const result = await db.query(
    `INSERT INTO users (username,email,password_hash) VALUES ($1, $2, $3) RETURNING id, username, email`,
    [username, email, password_hash],
  );
  return result.rows[0];
};

const signIn = async ({ email, password }) => {
  const result = await db.query(
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

module.exports = {
  signUp,
  signIn,
};
