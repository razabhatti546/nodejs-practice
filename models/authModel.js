const db = require("../config/db");

const signUp = async ({ username, email, password_hash }) => {
  try {
    const existingemail = await db.query(
      `SELECT id FROM users WHERE email = $1`,
      [email],
    );
    if (existingemail.rows.length > 0) {
      throw new Error("Email already exists");
    }
    const existingusername = await db.query(
      `SELECT id FROM users WHERE username = $1`,
      [username],
    );
    if (existingusername.rows.length > 0) {
      throw new Error("Username already exists");
    }
    const result = await db.query(
      `INSERT INTO users (username,email,password_hash) VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, password_hash],
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signIn = async ({ email, password }) => {
  const result = await db.query(
    `SELECT id, username, email, password_hash FROM users WHERE email = $1`,
    [email],
  );
  const user = result.rows[0];
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return { id: user.id, username: user.username, email: user.email };
};

module.exports = {
  signUp,
  signIn,
};
