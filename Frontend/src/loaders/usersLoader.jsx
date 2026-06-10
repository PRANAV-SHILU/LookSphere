import { fetchAllUsers } from "../services/userService.js";

export async function usersLoader() {
  try {
    const res = await fetchAllUsers();
    return res;
  } catch (err) {
    console.log("users loader error:", err);
    throw new Error("Failed to fetch users. Please try again later.");
  }
}
