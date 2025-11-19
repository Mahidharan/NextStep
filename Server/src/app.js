import express from "express";
import cors from "cors";

const app = express();

//Basic configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

//CORS configuration
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to nextstep");
});

export default app;
