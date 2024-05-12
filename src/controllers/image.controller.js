import prismaClient from "../database/prismaClient.js";
import { resolve } from "node:path";
import { FileOperations } from "../utils/FileOperations.js";
import { cannotBeNull } from "../utils/cannotBeNull.js";

class ImageController {
  async find(req, res) {
    try {
      const { id } = req.params;
      cannotBeNull({ id });

      const image = await prismaClient.image.findFirstOrThrow({
        where: { id },
      });

      res.send(image);
    } catch (error) {
      console.error(`[ImageController] - Error when trying to get the image: ` + error);
      res.status(400).json({ error: `Error when trying to get the image:  ` + error });
    }
  }
  async create(req, res) {
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
      res.status(400).json({ error: `Error when trying to create the image: ` + error });
      FileOperations.rm(path);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { path } = req.body;

      cannotBeNull({ id, path });

      const image = await prismaClient.image.findFirstOrThrow({
        where: {
          id,
        },
      });

      await FileOperations.mv(image.path, path);

      const newImage = await prismaClient.image.update({
        where: {
          id,
        },
        data: {
          path,
        },
      });

      res.send(newImage);
    } catch (error) {
      console.error(`[ImageController] - Error when trying to update the image: ` + error);
      res.status(400).json({ error: `Error when trying to update the image: ` + error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      cannotBeNull({ id });

      const image = await prismaClient.image.delete({ where: { id } });
      await FileOperations.rm(image.path);

      res.sendStatus(200);
    } catch (error) {
      console.error(`[ImageController] - Error when trying to create the image: ` + error);
      res.status(400).json({ error: `Error when trying to create the image: ` + error });
    }
  }
}

export { ImageController };
