const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  deleteAll,
} = require("../controllers/authController");

router
  .post("/register", register)
  .post("/login", login)
  .get("/logout", logout)
  .delete("/", deleteAll);

module.exports = router;
