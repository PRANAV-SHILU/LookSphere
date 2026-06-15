import { redirect } from "react-router-dom";
import { fetchProfile } from "../services/userService.js";

export async function profileLoader({ params }) {
  const { username } = params || {};

  if (!username) {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }
  }

  try {
    const res = await fetchProfile(username);
    
    return res;
  } catch (err) {
    console.error("profileLoader error:", err);
    return redirect(username ? "/users" : "/login");
  }
}
