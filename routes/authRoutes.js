const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  login,
  register,
  logout,
  verifyEmail,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");

router
  .post("/register", register)
  .post("/login", login)
  .delete("/logout", authenticateUser, logout)
  .post("/verify-email", verifyEmail)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword);

module.exports = router;
