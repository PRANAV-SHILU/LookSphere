import { fetchAllUsers } from "../services/userService.js";

export async function usersLoader() {
  try {
    const res = await fetchAllUsers();

    const storedUser = localStorage.getItem("user");
    const existingUser = storedUser ? JSON.parse(storedUser) : null;

    const usersArray = Array.isArray(res) ? res : [];

    const filteredUsers = usersArray.filter(
      (user) => user.username !== existingUser?.username,
    );
    return filteredUsers;
  } catch (err) {
    console.log("users loader error:", err);
    throw new Error("Failed to fetch users. Please try again later.");
  }
}
