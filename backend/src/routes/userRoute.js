// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// @route POST /api/user/register
router.post("/register", userController.register);

// @route POST /api/user/login
router.post("/login", userController.login);

// @route POST /api/user/refresh
router.post("/refresh", userController.refresh);

// @route POST /api/user/logout
router.post("/logout", userController.logout);

module.exports = router;
