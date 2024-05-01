import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer.js";

const router = Router();

router.post("/", multer(multerConfig).single("file"), (req, res) => {
  res.json(req.file)
});

export default router;
