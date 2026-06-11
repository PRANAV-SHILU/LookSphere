import { redirect } from "react-router-dom";
import { fetchPublicProfile } from "../services/userService.js";

export async function publicProfileLoader({ params }) {
  const { username } = params;

  try {
    const res = await fetchPublicProfile(username);
    return res;
  } catch (err) {
    console.error("publicProfileLoader error:", err);
    return redirect("/users");
  }
}
