import {
  createUser as createUserRecord,
  deleteUser as deleteUserRecord,
  getAllUsers,
  getUserById as findUserById,
  updateUser as updateUserRecord,
} from "../models/userModel.js";
import AppError from "../utils/AppError.js";

const getUserInput = ({ username, email, password_hash } = {}) => {
  if (!username || !email || !password_hash) {
    throw new AppError("username, email and password_hash are required", 400);
  }

  return { username, email, password_hash };
};

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

export const createUser = async (req, res) => {
  const userInput = getUserInput(req.body);
  const user = await createUserRecord(userInput);

  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const userInput = getUserInput(req.body);
  const user = await updateUserRecord(req.params.id, userInput);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await deleteUserRecord(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    message: "User deleted successfully",
    user,
  });
};

export const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json(user);
};
