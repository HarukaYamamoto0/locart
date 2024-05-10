import { PrismaClient } from "@prisma/client";
import configs from "../../locart.config.js";

const prismaClient = new PrismaClient({
  datasourceUrl: configs.database.database_url,
});

export default prismaClient;
