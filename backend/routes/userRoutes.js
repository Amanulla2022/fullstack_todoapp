const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");

const router = express.Router();

// POST Route for craeting a new User
router.post("/register", registerUser);

// POST Route for login as a user
router.post("/login", loginUser);

// GET Route for logout as a user
router.get("/logout", logoutUser);

module.exports = router;
