import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./DataBase/index.js";
import { initWebSocket } from "./Socket.js";
import http from "http";

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

initWebSocket(server);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error");
    process.exit(1);
  });
