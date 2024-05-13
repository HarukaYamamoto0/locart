import { resolve } from "node:path";
import { prismaClient } from "../database/prismaClient.js";
import { redisClient } from "../database/redisClient.js";
import { FileOperations } from "../utils/FileOperations.js";
import { cannotBeNull } from "../utils/cannotBeNull.js";
import { readFile } from "node:fs/promises";
import { fileTypeFromBuffer } from "file-type";

class ImageController {
  async get(req, res) {
    try {
      const { id } = req.params;
      cannotBeNull({ id });

      let image = await redisClient.getBuffer(`image-buffer-${id}`);

      if (!image) {
        const imageRedis = await prismaClient.image.findFirstOrThrow({
          where: { id },
        });

        if (!imageRedis) res.status(400).json({ error: `Image id ${id} does not exist` });

        image = await readFile(imageRedis.path);

        /*
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Expires", new Date(Date.now() + 3600000).toUTCString());
        res.setHeader("Last-Modified", new Date().toUTCString());
        */

        await redisClient.setBuffer(`image-buffer-${id}`, image);
      }

      const fileType = await fileTypeFromBuffer(image);

      res.setHeader("Content-Type", fileType.mime);
      res.send(image);

      /*

      if (imageRedis) {
        const imageParsed = JSON.parse(imageRedis);

        return res.sendFile(imageParsed.path, (error) => {
          if (error) throw new Error(error);
        });
      }

      const image = await prismaClient.image.findFirstOrThrow({
        where: { id },
      });

      res.sendFile(image.path, (error) => {
        if (error) throw new Error(error);
      });

      await redisClient.set(`image-file-${id}`, JSON.stringify(image));
      */
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
