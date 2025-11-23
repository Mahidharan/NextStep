import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localpath: "",
      },
    },
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      trim: true,
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
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("user", userSchema);
