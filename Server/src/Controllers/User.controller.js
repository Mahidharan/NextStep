import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/api-response.js";
import { ApiError } from "../Utils/api-error.js";
import { User } from "../Models/user.models.js";

const googleLogin = asyncHandler(async (req, res) => {
  const { googleId, avatar, email, name } = req.body;

  if (!googleId || !email) {
    throw new ApiError(400, "Mail is required");
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
      googleId,
      name,
      email,
      avatar: {
        url: avatar || "https://placehold.co/200x200",
      },
    });
  }
  return res
    .status(200)
    .json(new ApiResponse(201, user, "User LoggedIn succcessfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, bio, linkedIn, resumeUrl, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    req.body?.userId,
    {
      $set: {
        name,
        email: email,
        bio,
        linkedIn,
        resumeUrl,
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

const uploadResume = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  //Later Integration
  const fileUrl = req.file?.path;

  if (!fileUrl) {
    throw new ApiError(400, "Resume file not found");
  }

  const user = await User.findByIdAndUpdate(
    req.body?.userId,
    { resumeUrl: fileUrl },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Resume Uploaded successfully"));
});

export { googleLogin, getUser, updateUser, uploadResume };
