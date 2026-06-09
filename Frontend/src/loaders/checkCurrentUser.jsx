import { redirect } from "react-router-dom";

export async function checkCurrentUser() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return redirect("/login");
  }

  return user;
}
