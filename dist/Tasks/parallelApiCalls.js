"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parallelApiCalls = parallelApiCalls;
const axios_1 = __importDefault(require("axios"));
// Function to fetch users
async function fetchUsers() {
    try {
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/users");
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
// Function to fetch posts
async function fetchPosts() {
    try {
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/posts");
        return { success: true, data: response.data };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
// Main function to call APIs in parallel
async function parallelApiCalls() {
    try {
        // Run both API calls in parallel
        const [usersResult, postsResult] = await Promise.all([
            fetchUsers(),
            fetchPosts(),
        ]);
        if (usersResult.success && postsResult.success) {
            console.log("✅ Users and Posts fetched successfully!");
            console.log("\n--- Users ---");
            usersResult.data?.slice(0, 3).forEach((user) => console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`));
            console.log("\n--- Posts ---");
            postsResult.data?.slice(0, 3).forEach((post) => console.log(`ID: ${post.id}, Title: ${post.title}`));
        }
        else {
            console.error("❌ Error fetching data:");
            console.error("Users:", usersResult.error);
            console.error("Posts:", postsResult.error);
        }
    }
    catch (err) {
        console.error("Unexpected error:", err);
    }
}
