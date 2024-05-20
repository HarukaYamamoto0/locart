import { PrismaClient } from "@prisma/client";
import { configs } from "../configs/loadenv.js";

const prismaClient = new PrismaClient({
  datasourceUrl: configs.database.database_url,
});

async function checkDatabaseConnection() {
  try {
    await prismaClient.image.findMany(); // I will change this to users
    console.log("[Prisma] - Successful database connection");
  } catch (error) {
    console.error("[Prisma] - Failed when trying to connect to the database" + error);
    process.exit(1);
  }
}

export { prismaClient, checkDatabaseConnection };
