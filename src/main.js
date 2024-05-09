import express from "express";
import cors from "cors";
import helmet from "helmet";

import configs from "../locart.config.js";
import imageRouter from "./routes/images.router.js";
import connectDatabase from "./core/scripts/db.connection.js";

const app = express();
const port = configs.server.port || 3000;

await connectDatabase();

// Express configuration
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`[Server] - Server started`);
});
