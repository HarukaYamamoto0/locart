import { resolve } from "node:path";
import { prismaClient } from "../database/prismaClient.js";
import { redisClient } from "../database/redisClient.js";
import { FileOperations } from "../utils/FileOperations.js";
import { cannotBeNull } from "../utils/cannotBeNull.js";
import { readFile } from "node:fs/promises";
import { fileTypeFromBuffer } from "file-type";
import locartConfig from "../../locart.config.js";

const cacheTimeForServer = locartConfig.server.image_cache_time;
const cacheTimeForClient = locartConfig.database.redis.image_cache_time;

class ImageController {
  async get(req, res) {
    try {
      // TODO: This code can still be greatly optimized, but for now it works
      const { id } = req.params;

      const isNull = cannotBeNull({ id });

      if (isNull[0]) {
        return res.status(400).json({ error: `Parameter ${isNull[1]} cannot be empty` });
      }

      let image = await redisClient.getBuffer(`image-buffer-${id}`);
      let mimeType = null;

      if (!image) {
        const imageRedis = await prismaClient.image.findFirstOrThrow({
          where: { id },
        });

        if (!imageRedis) return res.status(400).json({ error: `Image id ${id} does not exist` });

        image = await readFile(imageRedis.path);
        mimeType = imageRedis.mimeType;

        res.setHeader("Cache-Control", `public, max-age=${cacheTimeForClient}`);
        res.setHeader("Expires", new Date(Date.now() + cacheTimeForClient).toUTCString());
        res.setHeader("Last-Modified", imageRedis.createdAt.toUTCString());

        await redisClient.setBuffer(`image-buffer-${id}`, image, "EX", cacheTimeForServer);
      }

      const fileType = mimeType != null ? mimeType : await fileTypeFromBuffer(image);

      res.setHeader("Content-Type", fileType.mime);
      res.send(image);
    } catch (error) {
      console.error("[ImageController-Get] - Error when trying to get the image: " + error.stack);
      res.status(500).json({ error: `Error when trying to get the image:  ` + error });
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
      res.status(500).json({ error: `Error when trying to create the image: ` + error });
      FileOperations.rm(path);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { path } = req.body;

      const isNull = cannotBeNull({ id, path })[0];

      if (!isNull)
        return res
          .status(400)
          .json({ error: `Parameter ${isNull[1]} cannot be null or undefined!` });

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
      res.status(500).json({ error: `Error when trying to update the image: ` + error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const isNull = cannotBeNull({ id })[0];

      if (!isNull)
        return res
          .status(400)
          .json({ error: `Parameter ${isNull[1]} cannot be null or undefined!` });

      const image = await prismaClient.image.delete({ where: { id } });
      await FileOperations.rm(image.path);

      res.sendStatus(200);
    } catch (error) {
      console.error(`[ImageController] - Error when trying to create the image: ` + error);
      res.status(500).json({ error: `Error when trying to create the image: ` + error });
    }
  }
}

export { ImageController };
