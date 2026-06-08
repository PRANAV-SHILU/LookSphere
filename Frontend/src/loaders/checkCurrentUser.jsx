import { redirect } from "react-router-dom";
import { fetchCurrentUser } from "../services/userService";

export async function checkCurrentUser() {
  try {
    // TODO: Verify JWT token validity with backend
    const user = await fetchCurrentUser();

    if (!user) {
      return redirect("/");
    }

    return { isLoggedIn: true, name: user.name };
  } catch (err) {
    console.error("checkCurrentUser error:", err);
    return { isLoggedIn: false, user: null };
  }
}
