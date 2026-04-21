const express = require("express");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
