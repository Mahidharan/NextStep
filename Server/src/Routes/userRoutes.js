import { Router } from "express";
import {
  getUser,
  updateUser,
  uploadResume,
  uploadAvatar,
} from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";
import passport from "../Config/googleAuth.js";

const router = Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const user = req.user;

    res.redirect(
      `http://localhost:5173/auth-success?user=${JSON.stringify(user)}`,
    );
  },
);

router.route("/profile/:id").get(getUser);
router.route("/profile/update/:id").put(updateUser);
router.route("/avatar/:id").put(upload.single("avatar"), uploadAvatar);
router
  .route("/profile/:id/upload-resume")
  .put(upload.single("resume"), uploadResume);

export default router;
