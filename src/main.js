import express from "express";
import configs from "../locart.config.js";
import cors from "cors";
import helmet from "helmet";
import imageRouter from "./routes/images.router.js";

const app = express();
const port = configs.server.port || 3000;

// Express configuration
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`[Server] - Server started`);
});
