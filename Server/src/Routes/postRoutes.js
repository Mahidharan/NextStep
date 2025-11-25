import { Router } from "express";
import {
  createPost,
  getPost,
  addComment,
} from "../Controllers/Post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/:id").get(getPost);
router.route("/comment/:id").post(addComment);

export default router;
