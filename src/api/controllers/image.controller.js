import { ImageService } from "../services/image.service.js";

class ImageController {
  static async get(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Image ID was not passed" });

    const result = await ImageService.get(id);

    if (result.isLeft()) {
      return res.status(result.value.code).json({ error: result.value.message });
    }

    res.setHeader("Content-Type", result.value.mimetype);
    return res.send(result.value.buffer);
  }

  static async create(req, res) {
    if (!req?.file)
      return res.status(400).json({ error: "The image was not passed in the image field" });

    const { mimetype, filename, path } = req.file;
    const id = filename.split(".")[0];

    const result = await ImageService.create({ id, path, mimetype });

    if (result.isLeft()) {
      return res.status(result.value.code).json({ error: result.value.message });
    }

    return res.send(result.value);
  }

  static async update(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Image ID was not passed" });

    const { path } = req.body;
    if (!path) return res.status(400).json({ error: "The new path was not specified in the body" });

    const result = await ImageService.update(id, { path });

    if (result.isLeft()) {
      return res.status(result.value.code).json({ error: result.value.message });
    }

    return res.send(result.value);
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Image ID was not passed" });

    const result = await ImageService.delete(id);

    if (result.isLeft()) {
      return res.status(result.value.code).json({ error: result.value.message });
    }

    return res.send(result.value);
  }
}

export { ImageController };
