import { connect } from "mongoose";
import configs from "../../../locart.config.js";

export default async function connectDatabase() {
  const url = configs.database["database_url"];

  if (!url) {
    console.error("[Database] - Unable to find database connection url");
    process.exit(1);
  }

  try {
    await connect(url);
    console.log("[Database] - Connected successfully");
  } catch (error) {
    console.error("[Database] - Error trying to connect:", error);
    process.exit(1);
  }
}
