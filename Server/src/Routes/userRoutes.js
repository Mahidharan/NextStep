import { Router } from "express";
import {
  getUser,
  updateUser,
  uploadResume,
  uploadAvatar,
  searchUser,
} from "../Controllers/User.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";
import passport from "../Config/googleAuth.js";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `${process.env.ORIGIN}/login`,
  }),
  (req, res) => {
    const user = req.user;

    res.redirect(`${process.env.ORIGIN}/auth-success`);
  },
);

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ success: true });
    });
  });
});

router.route("/profile/:id").get(getUser);
router.route("/profile/update/:id").put(updateUser);
router.route("/avatar/:id").put(upload.single("avatar"), uploadAvatar);
router
  .route("/profile/:id/upload-resume")
  .put(upload.single("resume"), uploadResume);

router.route("/search").get(searchUser);

export default router;
