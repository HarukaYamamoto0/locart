import { rm as rmFile, mkdir } from "node:fs";

class FileOperations {
  static rm(path) {
    rmFile(path, { recursive: true }, (error) => {
      if (error) {
        console.error(
          "[FileOperations] - Error when trying to delete the file: " + path + "\n" + error,
        );
      }
    });
  }

  static createStoragePath(path) {
    mkdir(path, { recursive: true }, (error) => {
      if (error) {
        console.error(
          "[FileOperations] - Error when trying to create storage: " + path + "\n" + error,
        );
      }
    });
  }
}

export { FileOperations };
