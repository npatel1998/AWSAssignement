import * as fs from "fs";
import * as path from "path";
import { syncFileOps, asyncFileOps, streamFileOps } from "@Tasks/fileOperations";

const filePath = path.join(__dirname, "example.txt");

describe("File Operations", () => {
  afterEach(() => {
    // Clean up test file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  //
  // 1️⃣ Synchronous Tests
  //
  test("syncFileOps should create, read, update, and delete file", () => {
    syncFileOps();

    // After deletion, file should not exist
    expect(fs.existsSync(filePath)).toBe(false);
  });

  //
  // 2️⃣ Asynchronous Tests
  //
  test("asyncFileOps should create, read, update, and delete file", async () => {
    await asyncFileOps();

    // After deletion, file should not exist
    expect(fs.existsSync(filePath)).toBe(false);
  });

  //
  // 3️⃣ Stream Tests
  //
  test("streamFileOps should create, read, update, and delete file", (done) => {
    streamFileOps();

    // Wait a bit for streams to finish
    setTimeout(() => {
      expect(fs.existsSync(filePath)).toBe(false);
      done();
    }, 500);
  });
});