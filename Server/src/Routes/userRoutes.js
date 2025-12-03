import { Router } from "express";
import {
  googleLogin,
  getUser,
  updateUser,
  uploadResume,
  uploadAvatar,
} from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";

const router = Router();

router.route("/google-login").post(googleLogin);
router.route("/profile/:id").get(getUser);
router.route("/profile/update/:id").put(updateUser);
router.route("/avatar/:id").put(upload.single("avatar"), uploadAvatar);
router
  .route("/profile/:id/upload-resume")
  .put(upload.single("resume"), uploadResume);

export default router;
