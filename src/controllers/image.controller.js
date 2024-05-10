import { Router } from "express";
import multer from "multer";
import multerConfig from "../core/multer.js";
import prismaClient from "../database/prismaClient.js";
import { resolve } from "node:path";
import { FileOperations } from "../utils/FileOperations.js";

const router = Router();

router.post("/", multer(multerConfig).single("file"), async (req, res) => {
  const path = resolve(req.file.destination, req.file.filename);

  try {
    const image = await prismaClient.image.create({
      data: {
        id: req.file.filename.split(".")[0],
        path,
      },
    });
    res.send(image);
  } catch (error) {
    console.error(`[ImageController] - Error when trying to create the image: ` + error);
    FileOperations.rm(path);
  }
});

export default router;
