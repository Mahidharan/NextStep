import { Router } from "express";
import {
  googleLogin,
  getUser,
  updateUser,
  uploadResume,
} from "../Controllers/User.controller.js";

const router = Router();

router.route("/google-login").post(googleLogin);
router.route("/profile/:id").get(getUser);
router.route("/profile/update/:id").put(updateUser);

export default router;
