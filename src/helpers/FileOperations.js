import { promises as fs } from "node:fs";

/**
 * Class for performing file operations.
 */
class FileOperations {
  /**
   * Reads a file and returns its content as a buffer.
   * @param {string} path - The path to the file.
   * @returns {Promise<Buffer>} - A promise that resolves to the file content as a buffer.
   * @throws Will throw an error if the file cannot be read.
   */
  static async readFile(path) {
    try {
      return await fs.readFile(path);
    } catch (error) {
      console.error(`[FileOperations] - Error when trying to read the file: ${path}\n${error}`);
      throw error;
    }
  }

  /**
   * Deletes a file or directory.
   * @param {string} path - The path to the file or directory.
   * @returns {Promise<void>} - A promise that resolves when the file or directory is deleted.
   * @throws Will throw an error if the file or directory cannot be deleted.
   */
  static async rmFile(path) {
    try {
      await fs.rm(path, { recursive: true });
    } catch (error) {
      console.error(`[FileOperations] - Error when trying to delete the file: ${path}\n${error}`);
      throw error;
    }
  }

  /**
   * Moves a file from one path to another.
   * @param {string} sourcePath - The current path of the file.
   * @param {string} destinationPath - The new path of the file.
   * @returns {Promise<void>} - A promise that resolves when the file is moved.
   * @throws Will throw an error if the file cannot be moved.
   */
  static async moveFile(sourcePath, destinationPath) {
    try {
      await fs.rename(sourcePath, destinationPath);
    } catch (error) {
      console.error(
        `[FileOperations] - Error when trying to move the file from ${sourcePath} to ${destinationPath}\n${error}`,
      );
      throw error;
    }
  }

  /**
   * Checks if a file or directory exists.
   * @param {string} path - The path to the file or directory.
   * @returns {Promise<boolean>} - A promise that resolves to true if the file or directory exists, otherwise false.
   */
  static async exists(path) {
    try {
      await fs.stat(path);
      return true;
    } catch {
      console.log(`[FileOperations] - File or directory does not exist: ${path}`);
      return false;
    }
  }

  /**
   * Creates a directory, including any necessary parent directories.
   * @param {string} path - The path to the directory.
   * @returns {Promise<void>} - A promise that resolves when the directory is created.
   * @throws Will throw an error if the directory cannot be created.
   */
  static async createStoragePath(path) {
    try {
      await fs.mkdir(path, { recursive: true });
    } catch (error) {
      console.error(`[FileOperations] - Error when trying to create storage: ${path}\n${error}`);
      throw error;
    }
  }
}

export { FileOperations };
