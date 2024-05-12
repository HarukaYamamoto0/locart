import express from "express";
import cors from "cors";
import helmet from "helmet";
import routers from "./routers.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routers
app.use("/api", routers);

export { app };
