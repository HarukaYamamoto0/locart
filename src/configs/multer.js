import multer from "multer";
import configs from "../../locart.config.js";
import { ObjectId } from "bson";
import { FileOperations } from "../helpers/FileOperations.js";

const { path: storagePath, sizeLimit, allowedMimes } = configs.storage;

FileOperations.createStoragePath(storagePath);

const storageConfig = {
  dest: storagePath,
  storage: multer.diskStorage({
    destination: storagePath,
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];
      cb(null, new ObjectId() + "." + fileExtension);
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

export { storageConfig };
