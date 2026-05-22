require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const bookRoutes = require("./routes/book-routes");

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handler (IMPORTANT: before listen)
const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error",
  });
};

// register error middleware
app.use(errorHandler);

// start server
const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`✅ Server Running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
