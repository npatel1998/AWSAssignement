import * as fs from "fs";
import { promises as fsp } from "fs";
import * as path from "path";
import logger from "helper/logger";
const filePath = path.join(__dirname, "example.txt");

//
// 1️⃣ Synchronous File Operations
//
export function syncFileOps() {
  logger.info("=== Synchronous File Operations ===");

  // Create / Write
  fs.writeFileSync(filePath, "Hello, this is sync write!");
  console.log("File created synchronously.");

  // Read
  const data = fs.readFileSync(filePath, "utf-8");
  console.log("Read synchronously:", data);

  // Update (append)
  fs.appendFileSync(filePath, "\nAppended line synchronously.");
  console.log("File updated synchronously.");

  // Delete
  fs.unlinkSync(filePath);
  console.log("File deleted synchronously.");
}

//
// 2️⃣ Asynchronous File Operations (Promises + async/await)
//
export async function asyncFileOps() {
  console.log("\n=== Asynchronous File Operations ===");

  try {
    // Create / Write
    await fsp.writeFile(filePath, "Hello, this is async write!");
    console.log("File created asynchronously.");

    // Read
    const data = await fsp.readFile(filePath, "utf-8");
    console.log("Read asynchronously:", data);

    // Update (append)
    await fsp.appendFile(filePath, "\nAppended line asynchronously.");
    console.log("File updated asynchronously.");

    // Delete
    await fsp.unlink(filePath);
    console.log("File deleted asynchronously.");
  } catch (err) {
    console.error("Error in async ops:", err);
  }
}

//
// 3️⃣ Stream-based File Operations
//
export function streamFileOps() {
  console.log("\n=== Stream File Operations ===");

  // Create / Write using WriteStream
  const writeStream = fs.createWriteStream(filePath);
  writeStream.write("Hello, this is stream write!\n");
  writeStream.write("Second line via stream.\n");
  writeStream.end(() => console.log("File created via stream."));

  // Read using ReadStream
  writeStream.on("finish", () => {
    const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
    readStream.on("data", (chunk) => {
      console.log("Read chunk via stream:", chunk);
    });
    readStream.on("end", () => {
      console.log("Finished reading via stream.");

      // Update (append) using stream
      const appendStream = fs.createWriteStream(filePath, { flags: "a" });
      appendStream.write("Appended line via stream.\n");
      appendStream.end(() => {
        console.log("File updated via stream.");

        // Delete after update
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting via stream:", err);
          else console.log("File deleted via stream.");
        });
      });
    });
  });
}

//
// Run all three
//
export async function fileOperation() {
  syncFileOps();
  await asyncFileOps();
  streamFileOps();
}
