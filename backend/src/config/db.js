const mongoose = require("mongoose");
const connectDB = async()=>{
  try{
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      socketTimeoutMS: 45000,
    });
    
    console.log(" MongoDB connected successfully");

    // PROBLEM FIXED: Verify connection
    const connection = mongoose.connection;
    connection.on('error', (error) => {
      console.error(" MongoDB connection lost:", error);
    });

    connection.on('disconnected', () => {
      console.error("MongoDB disconnected");
    });

  }catch(error){
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1); // PROBLEM FIXED: Exit process if DB fails to connect
  }
}
module.exports = connectDB;