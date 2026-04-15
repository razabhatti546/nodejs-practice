const express = require("express");
const productRoutes = require("./productRoutes");

const router = express.Router();

router.use("/shop", productRoutes);

module.exports = router;
