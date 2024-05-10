import { app } from "./app.js";
import configs from "../locart.config.js";
import { checkDatabaseConnection } from "./database/checkDatabaseConnection.js";

const port = configs.server.port || process.env.PORT || 3333;

await checkDatabaseConnection();

app.listen(port, () => {
  console.log(`[Server] - Server started`);
});
