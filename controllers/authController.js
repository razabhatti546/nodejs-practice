import bcrypt from "bcrypt";
import {
  signIn as findUserByCredentials,
  signUp as createUserWithPassword,
} from "../models/authModel.js";
import AppError from "../utils/AppError.js";
import { signToken } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

const buildAuthResponse = (user) => ({
  token: signToken({ id: user.id }),
  user,
});

const normalizeCredentials = (
  { username, email, password } = {},
  requireUsername,
) => {
  const normalizedUsername =
    typeof username === "string" ? username.trim() : username;
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : email;

  if (
    (requireUsername && !normalizedUsername) ||
    !normalizedEmail ||
    typeof password !== "string" ||
    !password
  ) {
    throw new AppError(
      requireUsername
        ? "username, email and password are required"
        : "email and password are required",
      400,
    );
  }

  return {
    username: normalizedUsername,
    email: normalizedEmail,
    password,
  };
};

export const signUp = async (req, res) => {
  const { username, email, password } = normalizeCredentials(req.body, true);

  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters long", 400);
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUserWithPassword({
    username,
    email,
    password_hash,
  });

  res.status(201).json({
    success: true,
    data: buildAuthResponse(user),
  });
};

export const signIn = async (req, res) => {
  const { email, password } = normalizeCredentials(req.body, false);

  const user = await findUserByCredentials({
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: buildAuthResponse(user),
  });
};

export const me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
};
