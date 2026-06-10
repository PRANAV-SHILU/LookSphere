import { redirect } from "react-router-dom";
import { fetchOwnProfile } from "../services/userService.js";

export async function profileLoader() {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }

    const res = await fetchOwnProfile();
    return res;
  } catch (err) {
    console.error("profileLoader error:", err);
    return redirect("/login");
  }
}
