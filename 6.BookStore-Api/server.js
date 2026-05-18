require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const app = express();
const PORT = process.env.PORT || 8000;

//middleware => express.json()
app.use(express.json());

//connect to our database
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
