const express = require("express");
const router = express.Router();
const protectMiddleware = require("../middlewares/auth-middleware");
const isAdmin = require('../middlewares/admin-middleware');

router.get('/welcome' ,protectMiddleware , isAdmin ,(req , res)=> {
return req.res.status(200).json({
    message: "Welcome to the admin page",
    
  });
}) ;

module.exports = router ;