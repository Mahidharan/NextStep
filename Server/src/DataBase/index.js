import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "NextStep",
    });
    console.log("✅MongoDB connected");
  } catch (error) {
    console.log("❌MongoDB connection error");
    process.exit(1);
  }
};

export default connectDB;
