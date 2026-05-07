const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");
const { validateToken2 } = require("../config/validateToken");

// AUTH ROUTES
router.post("/signupaxios", userController.doSignup);
router.post("/loginaxios", userController.doLogin);

module.exports = router;