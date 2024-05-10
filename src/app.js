import express from "express";
import cors from "cors";
import helmet from "helmet";

import imageController from "./controllers/image.controller.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Controllers
app.use("/images", imageController);

export { app };
