import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import imageRouter from "./routes/images.js";

const app = express();
const port = process.env["PORT"] || 3000;
const env = process.env["APP_ENV"] || "dev";

// Express configuration
app.use(cors());
app.use(helmet());
app.use(morgan(env));
app.use(express.json());

// Routes
app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`[Server] - Server started`);
});
