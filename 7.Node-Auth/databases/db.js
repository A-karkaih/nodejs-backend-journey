const mongoose = require("mongoose");
const dns = require("node:dns/promises");

// Force Node to use Cloudflare and Google public DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
