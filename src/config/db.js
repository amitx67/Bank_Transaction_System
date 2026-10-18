const mongoose = require("mongoose");

async function connectToDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from your .env file");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    throw err;
  }
}

module.exports = connectToDB;
