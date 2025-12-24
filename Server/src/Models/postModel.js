import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
  {
    userAvatar: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    comments: [
      {
        avatar: {
          type: String,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);
