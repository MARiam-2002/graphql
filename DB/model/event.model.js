import mongoose, { Schema, Types, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    creators: {
        type: Types.ObjectId,
        ref: "User",
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.models.eventModel || model("Event", eventSchema);
export default eventModel;
