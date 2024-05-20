import { Router } from "express";
import { ImageController } from "./controllers/image.controller.js";
import multer from "multer";
import { storageConfig } from "../configs/multer.js";

const router = Router();

router.get("/images/:id", ImageController.get);
router.post("/images", multer(storageConfig).single("image"), ImageController.create);
router.post("/images/:id", ImageController.update);
router.delete("/images/:id", ImageController.delete);

export default router;
