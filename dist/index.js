"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fileOperations_1 = require("@Tasks/fileOperations");
console.log("Calling single Api Call");
async function main() {
    // await singleApiCall();
    // await parallelApiCalls()
    await (0, fileOperations_1.fileOperation)();
}
main();
