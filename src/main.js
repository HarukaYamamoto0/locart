import express from "express";
import imageRouter from "./routes/images.js";

const app = express();

// Routes
app.use("/images", imageRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("[Server] - Server started!!");
});
