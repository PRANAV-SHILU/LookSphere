import { redirect } from "react-router-dom";
import { fetchProfile } from "../services/userService.js";

export function profileLoader({ params }) {
  const { username } = params || {};

  if (!username) {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }
  }

  const profilePromise = fetchProfile(username).catch((err) => {
    console.error("profileLoader error:", err);
    throw new Error("Failed to fetch profile. Please try again later.");
  });

  return { profileData: profilePromise };
}
