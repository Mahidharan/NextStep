import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../Models/user.models.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || "Google User";
        const avatar = profile.photos?.[0]?.value || "";

        if (!email) {
          return done(new Error("Google account has no email"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
          const baseUsername = name.replace(/\+s/g, "").toLowerCase();

          let username;
          let isUnique = false;

          while (!isUnique) {
            const random = Math.floor(1000 + Math.random() * 9000);
            username = `${baseUsername}_${random}`;
            const exists = await User.findOne({ username });
            if (!exists) isUnique = true;
          }
          user = await User.create({
            name,
            email,
            username,
            avatar: { url: avatar },
          });
        }

        return done(null, user);
      } catch (err) {
        console.error("Google Auth Error:", err);
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
