import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./DataBase/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error");
    process.exit(1);
  });
