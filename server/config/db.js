const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect...");
    console.log("URI exists:", !!process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;