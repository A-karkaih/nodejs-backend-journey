require("dotenv").config();
const express = require("express");
const connectToDb = require("./databases/db");
const authRouter = require("./routes/auth-routes");
const homeRouter = require("./routes/home-routes");

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);

// error handler (IMPORTANT: before listen)
const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error",
  });
};

// register error middleware
app.use(errorHandler);

// starting the server
const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`✅ Server Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
