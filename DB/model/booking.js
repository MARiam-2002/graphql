import mongoose, { Schema, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    event: {
      type: Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel =
  mongoose.models.bookingModel || model("Booking", bookingSchema);

export default bookingModel;
