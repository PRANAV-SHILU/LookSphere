import { redirect } from "react-router-dom";

export async function userLoader() {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }

    return user;
  } catch (err) {
    console.error("userLoader error:", err);
    return redirect("/login");
  }
}
