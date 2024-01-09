import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb successfully");
  } catch (error) {
    console.log("error while connecting to mongodb ");
  }
};

export default dbConnect;
