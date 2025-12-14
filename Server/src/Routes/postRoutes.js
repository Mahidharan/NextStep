import { Router } from "express";
import {
  createPost,
  getPost,
  addComment,
  getPostByUser,
} from "../Controllers/Post.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";

const router = Router();

router.route("/create").post(upload.single("postImage"), createPost);
router.route("/:id").get(getPost);
router.route("/user/:userId").get(getPostByUser);
router.route("/comment/:id").post(addComment);

export default router;
