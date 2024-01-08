const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middleware/authentication")

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(authenticateUser,getAllUsers);
router.route("/:id").get(authenticateUser,getSingleUser)
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").post(updateUser)
router.route("/updateUserPassword").post(updateUserPassword)


module.exports = router;
