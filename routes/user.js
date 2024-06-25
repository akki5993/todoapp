const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogout,
  userLogin,
  getUsers,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/users").get(getUsers);

module.exports = router;
