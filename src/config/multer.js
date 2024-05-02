import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const __dirname = import.meta.dirname;

export default {
  dest: path.resolve(__dirname, "..", "..", "storage"),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "storage"),
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];

      cb(null, uuidv4() + "." + fileExtension);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
      "image/gif",
    ];

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
