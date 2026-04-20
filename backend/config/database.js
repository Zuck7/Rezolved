const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.ATLASDB) {
      console.log('\n⚠️  MongoDB URI not configured.');
      console.log('To use a database, set ATLASDB in your .env file:');
      console.log('  - Atlas: mongodb+srv://username:password@cluster.mongodb.net/database');
      console.log('\nServer will run without database functionality.\n');
      return;
    }

    const conn = await mongoose.connect(process.env.ATLASDB);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\nServer will run without database functionality.\n');
  }
};

module.exports = connectDB;