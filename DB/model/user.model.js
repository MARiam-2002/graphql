import mongoose, { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "creators",
});
const userModel = mongoose.models.userModel || model("User", userSchema);
export default userModel;
