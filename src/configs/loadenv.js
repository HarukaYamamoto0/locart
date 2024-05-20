import path from "node:path";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config(".env");
} else if (process.env.NODE_ENV === "development") {
  dotenv.config(".env.dev");
} else {
  dotenv.config(".env.stage");
}

const __dirname = import.meta.dirname;

const configs = {
  environment: process.env.NODE_ENV,
  server: {
    port: process.env.SERVER_PORT,
  },
  database: {
    database_url: process.env.DATABASE_URL,
    redis_password: process.env.REDIS_PASSWORD,
  },
  storage: {
    path: path.resolve(__dirname, process.env.STORAGE_PATH),
    allowedMimes: process.env.STORAGE_ALLOWED_MIMES.split(","),
    sizeLimit: parseInt(process.env.STORAGE_SIZE_LIMIT, 10),
  },
};

export { configs };
