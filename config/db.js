// config/db.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/vendorbridge";
    await mongoose.connect(mongoUrl);
    console.log(`MongoDB connected natively at: ${mongoUrl}`);
  } catch (err) {
    console.warn('Native MongoDB connection failed (ECONNREFUSED). Falling back to MongoMemoryServer...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri);
      console.log(`Fallback MongoDB in-memory connected at: ${fallbackUri}`);
    } catch (fallbackErr) {
      console.error('Fatal MongoDB Error:', fallbackErr.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
