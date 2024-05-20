import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routers from "./api/routers.js";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression()); // TODO: See the performance problem when it compresses files
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/api", routers);

export { app };
