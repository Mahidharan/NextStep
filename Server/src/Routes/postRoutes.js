import { Router } from "express";
import {
  createPost,
  getPost,
  addComment,
  getPostByUser,
  getAllPosts,
} from "../Controllers/Post.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";

const router = Router();

router.route("/create").post(upload.single("postImage"), createPost);
router.route("/user/:userId").get(getPostByUser);
router.route("/comment/:id").post(addComment);
router.route("/all").get(getAllPosts);

router.route("/:id").get(getPost);

export default router;
