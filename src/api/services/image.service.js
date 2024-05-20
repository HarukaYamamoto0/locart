import { Left, Right } from "../../core/Either.js";
import { prismaClient } from "../../database/prismaClient.js";
import { ErrorMessages } from "../../helpers/ErrorMessages.js";
import { FileOperations } from "../../helpers/FileOperations.js";

class ImageService {
  static async get(id) {
    try {
      const image = await prismaClient.image.findUnique({
        where: { id },
      });

      if (!image) return new Left({ code: 400, message: "image not found" });

      const buffer = await FileOperations.readFile(image.path);

      return new Right({ buffer, mimetype: image.mimetype });
    } catch (error) {
      console.log("[ImageService] - Error when trying to recover the image:\n" + error.stack);
      return new Left(ErrorMessages.internalError);
    }
  }

  static async create({ id, path, mimetype }) {
    try {
      const image = await prismaClient.image.create({
        data: {
          id,
          path,
          mimetype,
        },
      });

      return new Right(image);
    } catch (error) {
      console.log("[ImageService] - Error when trying to create the image:\n" + error.stack);
      return new Left(ErrorMessages.internalError);
    }
  }

  static async update(id, { path }) {
    try {
      const image = await prismaClient.image.findUnique({
        where: { id },
      });

      if (!image) return new Left("image not found");

      const updatedImage = await prismaClient.image.update({
        where: { id },
        data: {
          path,
        },
      });

      await FileOperations.moveFile(image.path, path);

      return new Right(updatedImage);
    } catch (error) {
      console.log("[ImageService] - Error when trying to update the image:\n" + error.stack);
      return new Left(ErrorMessages.internalError);
    }
  }

  static async delete(id) {
    try {
      const image = await prismaClient.image.findUnique({
        where: { id },
      });

      if (!image) return new Left("image not found");

      await FileOperations.rmFile(image.path);

      await prismaClient.image.delete({
        where: { id },
      });

      return new Right({ ok: "ok" });
    } catch (error) {
      console.log("[ImageService] - Error when trying to delete the image:\n" + error.stack);
      return new Left(ErrorMessages.internalError);
    }
  }
}

export { ImageService };
