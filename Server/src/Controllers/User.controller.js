import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/api-response.js";
import { ApiError } from "../Utils/api-error.js";
import { User } from "../Models/user.models.js";
import { uploadCloudinary } from "../Utils/cloudinary.js";

// Get User
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

//updating user details
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, username, bio, linkedIn, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        username,
        email: email,
        bio,
        linkedIn,
      },
    },
    { new: true },
  );

  if (!updateUser) {
    throw new ApiError(400, "Not able to update user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateUser, "User details updated Successfully"),
    );
});

//uploading resume
const uploadResume = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    throw new ApiError(400, "Resume file not found");
  }

  const cloudUrl = await uploadCloudinary(req.file.path);

  if (!cloudUrl) {
    throw new ApiError(400, "Resume upload failed");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { resumeUrl: cloudUrl, resumeName: req.file.originalname },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Resume Uploaded successfully"));
});

//Avatar Uploading
const uploadAvatar = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    throw new ApiError(404, "Image Not found");
  }

  const cloudUrl = await uploadCloudinary(req.file.path);

  if (!cloudUrl) {
    throw new ApiError(400, "Failed to upload image");
  }

  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      avatar: { url: cloudUrl },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateUser, "Avatar Uploaded Successfully"));
});

export { getUser, updateUser, uploadResume, uploadAvatar };
