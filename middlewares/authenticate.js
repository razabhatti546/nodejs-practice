import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { findUserById } from "../models/authModel.js";

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

const authenticate = async (req, res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization);
    if (!token) {
      throw new AppError("Authentication token is required", 401);
    }

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid authentication token", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError("Authentication token has expired", 401));
    }

    return next(error);
  }
};

export default authenticate;
