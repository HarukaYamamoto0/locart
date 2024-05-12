import { Router } from "express";
import { ImageController } from "./controllers/image.controller.js";
import multer from "multer";
import { storageConfig } from "./configs/multer.js";

const router = Router();

const imageController = new ImageController();

router.get("/images/:id", imageController.find);
router.post("/images", multer(storageConfig).single("image"), imageController.create);
router.post("/images/:id", imageController.update);
router.delete("/images/:id", imageController.delete);

export default router;
