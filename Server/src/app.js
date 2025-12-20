import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import chatRoutes from "./Routes/Chat.routes.js";
import passport from "./Config/googleAuth.js";
import session from "express-session";
const app = express();

//Basic configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(
  session({
    secret: "NEXTSTEP_SECRET",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//Routing
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to nextstep");
});

export default app;
