import prismaClient from "./prismaClient.js";

async function checkDatabaseConnection() {
  try {
    await prismaClient.image.findMany(); // I will change this to users
    console.log("[Prisma] - Successful database connection");
  } catch (error) {
    console.error("[Prisma] - Failed when trying to connect to the database" + error);
    process.exit(1);
  }
}

export { checkDatabaseConnection };
