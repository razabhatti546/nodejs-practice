import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);

export default router;
