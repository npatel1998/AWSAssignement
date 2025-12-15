import axios, { type AxiosResponse } from "axios";
import type { ApiResult } from "@Types/type";


interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Function to fetch users from a dummy API
async function fetchUsers(): Promise<ApiResult<User[]>> {
  try {
    const response: AxiosResponse<User[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}


export  async function singleApiCall(): Promise<void> {
  const result = await fetchUsers();

  if (result.success && result.data) {
    console.log("✅ Users fetched successfully:");
    result.data.forEach((user) => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
  } else {
    console.error("❌ Error fetching users:", result.error);
  }
}
