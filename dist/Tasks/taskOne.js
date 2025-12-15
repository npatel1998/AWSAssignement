"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleApiCall = singleApiCall;
const axios_1 = __importDefault(require("axios"));
// Function to fetch users from a dummy API
async function fetchUsers() {
    try {
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/users");
        return {
            success: true,
            data: response.data,
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}
async function singleApiCall() {
    const result = await fetchUsers();
    if (result.success && result.data) {
        console.log("✅ Users fetched successfully:");
        result.data.forEach((user) => {
            console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
        });
    }
    else {
        console.error("❌ Error fetching users:", result.error);
    }
}
