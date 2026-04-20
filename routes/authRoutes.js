const express = require("express");
const authController = require("../controllers/authController");
const { errorHandler } = require("../middlewares/errorHandler");
const router = express.Router();

router.post("/signup", errorHandler(authController.signUp));
router.post("/signin", errorHandler(authController.signIn));

module.exports = router;
