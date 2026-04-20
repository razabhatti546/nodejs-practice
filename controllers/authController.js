const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, saltRounds);
    console.log(password_hash);
    const result = await authModel.signUp({
      username,
      email,
      password_hash,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authModel.signIn({ email, password });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
