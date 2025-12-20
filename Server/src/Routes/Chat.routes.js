import { Router } from "express";

import { sendMessage, getMessage } from "../Controllers/Chat.controller.js";

const router = Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

router.route("/send").post(ensureAuth, sendMessage);
router.route("/:userId").get(ensureAuth, getMessage);

export default router;
