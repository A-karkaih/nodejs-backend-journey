const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth-controller");
const protectMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

//all routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/change-password", protectMiddleware, changePassword);

module.exports = router;
