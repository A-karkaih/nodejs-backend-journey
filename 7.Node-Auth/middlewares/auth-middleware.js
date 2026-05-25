const jwt = require('jsonwebtoken');

const protectMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  //decode token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = decoded;
    console.log(decoded);
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protectMiddleware;
