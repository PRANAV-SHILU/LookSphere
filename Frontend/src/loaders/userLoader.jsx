import { redirect } from "react-router-dom";
import { fetchCurrentUser } from "../services/userService";

export async function userLoader() {
  try {
    // TODO: Fetch user profile using JWT token
    const user = await fetchCurrentUser();

    if (!user) {
      return redirect("/login");
    }

    return user;
  } catch (err) {
    throw new Error(err.message || "Failed to load user data. Please refresh.");
  }
}
