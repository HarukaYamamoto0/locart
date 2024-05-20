import fs from "fs";

const envPath = ".env";
const envExamplePath = ".env.example";

// Asynchronous function to generate the example values in .env.example
async function generateExampleEnv() {
  try {
    // Read the content of the .env file
    const data = await fs.promises.readFile(envPath, "utf8");

    // Split the content into lines
    const lines = data.split("\n");

    // Clear the values of the variables
    const cleanedLines = lines.map((line) => {
      // Ignore empty lines or full comments
      if (line.trim() === "" || line.trim().startsWith("#")) {
        return line;
      }

      // Find the position of the first "="
      const equalIndex = line.indexOf("=");

      // If there's no "=", return the original line
      if (equalIndex === -1) {
        return line;
      }

      // Separate the key and the rest (value and comment)
      const key = line.substring(0, equalIndex + 1);
      const rest = line.substring(equalIndex + 1);

      // Find the position of the first "#" after the "="
      const commentIndex = rest.indexOf("#");

      // If there's a comment, keep it
      const comment = commentIndex !== -1 ? " " + rest.substring(commentIndex) : "";

      return `${key}${comment}`;
    });

    // Join the lines back into a string
    const cleanedData = cleanedLines.join("\n");

    // Write the cleaned content back to the .env.example file
    await fs.promises.writeFile(envExamplePath, cleanedData, "utf8");
  } catch (error) {
    console.error("Error processing the file:", error);
  }
}

await generateExampleEnv();
