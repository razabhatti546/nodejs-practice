const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const saltRounds = 10;

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new AppError("username, email and password are required", 400);
  }

  const password_hash = await bcrypt.hash(password, saltRounds);
  const result = await authModel.signUp({
    username,
    email,
    password_hash,
  });

  res.status(201).json({
    success: true,
    data: result,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("email and password are required", 400);
  }

  const result = await authModel.signIn({ email, password });
  res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = {
  signUp,
  signIn,
};
