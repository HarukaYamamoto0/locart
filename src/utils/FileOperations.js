import { promises as fs } from "node:fs";

class FileOperations {
  static async rm(path) {
    try {
      await fs.rm(path, { recursive: true });
    } catch (error) {
      console.error(
        "[FileOperations] - Error when trying to delete the file: " + path + "\n" + error,
      );
    }
  }

  static async mv(sourcePath, destinationPath) {
    try {
      await fs.rename(sourcePath, destinationPath);
    } catch (error) {
      console.error(
        "[FileOperations] - Error when trying to move the file from " +
          sourcePath +
          " to " +
          destinationPath +
          "\n" +
          error,
      );
    }
  }

  static async exists(path) {
    try {
      await fs.stat(path);
      return true;
    } catch (error) {
      console.log("[FileOperations] - File or directory does not exist: " + path);
      return false;
    }
  }

  static async createStoragePath(path) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      console.error(
        "[FileOperations] - Error when trying to create storage: " + path + "\n" + error,
      );
    }
  }
}

export { FileOperations };
