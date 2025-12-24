import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/api-error.js";
import { ApiResponse } from "../Utils/api-response.js";
import { Chat } from "../Models/chat.Model.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const { receiverId, text } = req.body;

  if (!receiverId || !text) {
    throw new ApiError(400, "Receiver and Message are required");
  }

  const chat = await Chat.create({
    sender: senderId,
    receiver: receiverId,
    text,
  });

  const populatedChat = await Chat.findById(chat._id).populate(
    "sender receiver",
    "name avatar",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, populatedChat, "Message Sent Successfully"));
});

const getMessage = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const otherUserId = req.params.userId;

  const chat = await Chat.find({
    $or: [
      { sender: currentUserId, receiver: otherUserId },
      { sender: otherUserId, receiver: currentUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender receiver", "name avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "chat fetched successfully"));
});

export { sendMessage, getMessage };
