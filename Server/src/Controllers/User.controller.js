import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/api-response.js";
import { ApiError } from "../Utils/api-error.js";
import { User } from "../Models/user.models.js";
import { uploadCloudinary } from "../Utils/cloudinary.js";
import { verifyGoogleToken } from "../Config/googleAuth.js";


//Registering User
const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Google token missing");
  }

  const payload = await verifyGoogleToken(token);

  if (!payload) {
    throw new ApiError(401, "Invalid Google token");
  }

  const googleId = payload.sub;
  const email = payload.email;
  const name = payload.name;
  const avatar = payload.picture;

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
      googleId,
      name,
      email,
      avatar: { url: avatar },
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Logged In Successfully"));
});

//updating user details
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, bio, linkedIn, resumeUrl, email } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    userId,
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
    { resumeUrl: cloudUrl },
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

export { googleLogin, getUser, updateUser, uploadResume, uploadAvatar };
