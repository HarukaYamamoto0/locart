import Redis from "ioredis";
import locartConfig from "../../locart.config.js";

const redisClient = new Redis({ password: locartConfig.database.redis_password });

async function checkRedisConnection() {
  try {
    await redisClient.set("test", "test");
    console.log("[Redis] - Connection to redis successful");
  } catch (error) {
    console.error("[Redis] - Failed when trying to connect to redis" + error);
    process.exit(1);
  }
}

export { redisClient, checkRedisConnection };
