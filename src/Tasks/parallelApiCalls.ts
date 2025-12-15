import axios, { type AxiosResponse } from "axios";
import { type ApiResult } from "../Types/type.js";

// Define interfaces for API responses
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
// Function to fetch users
async function fetchUsers(): Promise<ApiResult<User[]>> {
  try {
    const response: AxiosResponse<User[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Function to fetch posts
async function fetchPosts(): Promise<ApiResult<Post[]>> {
  try {
    const response: AxiosResponse<Post[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Main function to call APIs in parallel
export async function parallelApiCalls(): Promise<void> {
  try {
    // Run both API calls in parallel
    const [usersResult, postsResult] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
    ]);

    if (usersResult.success && postsResult.success) {
      console.log("✅ Users and Posts fetched successfully!");

      console.log("\n--- Users ---");
      usersResult.data?.slice(0, 3).forEach((user) =>
        console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`)
      );

      console.log("\n--- Posts ---");
      postsResult.data?.slice(0, 3).forEach((post) =>
        console.log(`ID: ${post.id}, Title: ${post.title}`)
      );
    } else {
      console.error("❌ Error fetching data:");
      console.error("Users:", usersResult.error);
      console.error("Posts:", postsResult.error);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
