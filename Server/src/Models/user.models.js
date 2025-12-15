import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
      },
    },
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    resumeName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
