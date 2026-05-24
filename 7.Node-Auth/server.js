require("dotenv").config();
const express = require("express");
const connectToDb = require("./databases/db");

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

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
