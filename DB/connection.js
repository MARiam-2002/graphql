import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log("connected DB"))
    .catch(() => console.log("failed to connect"));
};
