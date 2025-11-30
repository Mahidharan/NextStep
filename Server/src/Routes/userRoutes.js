import { Router } from "express";
import {
  googleLogin,
  getUser,
  updateUser,
  uploadResume,
  uploadAvatar,
} from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";
import passport from "../Config/googleAuth.js";

const router = Router();

router.route("/google-login").post(googleLogin);
router.route("/profile/:id").get(getUser);
router.route("/profile/update/:id").put(updateUser);
router.route("/avatar/:id").put(upload.single("avatar"), uploadAvatar);
router
  .route("/profile/:id/upload-resume")
  .put(upload.single("resume"), uploadResume);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    res.redirect(
      `http://localhost:5173/auth-success?user=${JSON.stringify(user)}`,
    );
  },
);
export default router;
