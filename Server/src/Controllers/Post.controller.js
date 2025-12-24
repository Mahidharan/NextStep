import { Post } from "../Models/postModel.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/api-error.js";
import { ApiResponse } from "../Utils/api-response.js";
import { uploadCloudinary } from "../Utils/cloudinary.js";
import { User } from "../Models/user.models.js";

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

  const user = await User.findById(userId).select("avatar name username");

  if (!user) {
    throw ApiError(404, "User Not Found");
  }

  const post = await Post.create({
    userId,
    username: user.username,
    company,
    experience: experience,
    image: imageUrl,
    userAvatar: user?.avatar?.url,
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

//get all post
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  if (!posts) {
    throw new ApiError(400, "Error fetching");
  }

  return res.status(200).json(new ApiResponse(200, posts, "All posts fetched"));
});

//Get all post by user
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

//Adding Comment
const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;

  if (!userId || !text) {
    throw new ApiError(400, "All comment fields are required");
  }
  const user = await User.findById(userId).select("username avatar");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "Post Not Found");
  }

  post.comments.push({
    avatar: user.avatar?.url,
    userId,
    username: user.username,
    text,
  });
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Comment added Successfully"));
});

export { createPost, getPost, getPostByUser, addComment, getAllPosts };
