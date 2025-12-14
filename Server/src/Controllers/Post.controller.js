import { Post } from "../Models/postModel.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/api-error.js";
import { ApiResponse } from "../Utils/api-response.js";
import { uploadCloudinary } from "../Utils/cloudinary.js";

//Creating Post
const createPost = asyncHandler(async (req, res) => {
  const { userId, username, company, experience } = req.body;

  if (!userId || !username || !company || !experience) {
    throw new ApiError(400, "All Fields are required ");
  }

  let imageUrl = null;

  if (req.file) {
    const cloudinaryFile = await uploadCloudinary(req.file.path);

    if (!cloudinaryFile) {
      throw new ApiError(400, "Post Image Upload failed");
    }

    imageUrl = cloudinaryFile;
  }

  const post = await Post.create({
    userId,
    username,
    company,
    experience: experience,
    image: imageUrl,
  });

  if (!post) {
    throw new ApiError(400, "Something wrong when creating post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post created successfully"));
});

//getPost
const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

//Get All post
const getPostByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const posts = await Post.find({ userId }).sort({ createdAt: -1 });

  if (!posts) {
    throw new ApiError(404, "No post Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "User Posts fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, username, text } = req.body;

  if (!userId || !username || !text) {
    throw new ApiError(400, "All comment fields are required");
  }
  let post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "Post Not Found");
  }

  post.comments.push({
    userId,
    username,
    text,
  });
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Comment added Successfully"));
});

export { createPost, getPost, getPostByUser, addComment };
