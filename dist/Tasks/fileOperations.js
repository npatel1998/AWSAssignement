"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncFileOps = syncFileOps;
exports.asyncFileOps = asyncFileOps;
exports.streamFileOps = streamFileOps;
exports.fileOperation = fileOperation;
const fs = __importStar(require("fs"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const filePath = path.join(__dirname, "example.txt");
//
// 1️⃣ Synchronous File Operations
//
function syncFileOps() {
    console.log("=== Synchronous File Operations ===");
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
async function asyncFileOps() {
    console.log("\n=== Asynchronous File Operations ===");
    try {
        // Create / Write
        await fs_1.promises.writeFile(filePath, "Hello, this is async write!");
        console.log("File created asynchronously.");
        // Read
        const data = await fs_1.promises.readFile(filePath, "utf-8");
        console.log("Read asynchronously:", data);
        // Update (append)
        await fs_1.promises.appendFile(filePath, "\nAppended line asynchronously.");
        console.log("File updated asynchronously.");
        // Delete
        await fs_1.promises.unlink(filePath);
        console.log("File deleted asynchronously.");
    }
    catch (err) {
        console.error("Error in async ops:", err);
    }
}
//
// 3️⃣ Stream-based File Operations
//
function streamFileOps() {
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
                    if (err)
                        console.error("Error deleting via stream:", err);
                    else
                        console.log("File deleted via stream.");
                });
            });
        });
    });
}
//
// Run all three
//
async function fileOperation() {
    syncFileOps();
    await asyncFileOps();
    streamFileOps();
}
