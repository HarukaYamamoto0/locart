import { app } from "./app.js";
import { configs } from "./configs/loadenv.js";
import { checkDatabaseConnection } from "./database/prismaClient.js";
import { checkRedisConnection } from "./database/redisClient.js";

const port = configs.server.port || process.env.PORT || 3333;

await checkRedisConnection();
await checkDatabaseConnection();

app.listen(port, () => {
  console.log(`[Server] - Server started`);
});
