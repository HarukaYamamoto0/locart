import multer from "multer";
import configs from "../../locart.config.js";
import { randomUUID } from "node:crypto";

const { path: storagePath, sizeLimit, allowedMimes } = configs.storage;

const storageConfig = {
  dest: storagePath,
  storage: multer.diskStorage({
    destination: storagePath,
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];
      cb(null, randomUUID() + "." + fileExtension);
    },
  }),
  limits: {
    fileSize: sizeLimit,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type, valid types are: " + allowedMimes.join(", ").replace(/image\//g, ""),
        ),
      );
    }
  },
};

export default storageConfig;
