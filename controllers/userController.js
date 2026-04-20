const userModel = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password_hash } = req.body;

    if (!username || !email || !password_hash) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }

    const newUser = await userModel.createUser({
      username,
      email,
      password_hash,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password_hash } = req.body;

    if (!username || !email || !password_hash) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }

    const updatedUser = await userModel.updateUser(id, {
      username,
      email,
      password_hash,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
};
