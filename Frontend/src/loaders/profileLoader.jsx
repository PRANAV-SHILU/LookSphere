import { redirect } from "react-router-dom";

export async function profileLoader() {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }

    // TODO  : fetch profile

    return user;
  } catch (err) {
    console.error("profileLoader error:", err);
    return redirect("/login");
  }
}
