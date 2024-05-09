import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  server: {
    // The server port
    port: 3333,
  },
  database: {
    // The URL to connect to MongoDB
    database_url:
      "mongodb+srv://admim:95941412@cluster0.39vdz0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
  // storage settings
  storage: {
    // the path where the files will be saved.
    path: path.resolve(__dirname, "storage"),
    // the types of images allowed
    allowedMimes: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
      "image/gif",
    ],
    // The maximum size of images, default 2 MB
    sizeLimit: 2 * 1024 * 1024,
  },
};
