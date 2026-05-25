const express = require("express");
const router = express.Router();
const protectMiddleware = require("../middlewares/auth-middleware");

router.get("/welcome", protectMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  req.res.status(200).json({
    message: "Welcome to the home page",
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

module.exports = router;
