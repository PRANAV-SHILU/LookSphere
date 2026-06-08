import { redirect } from "react-router-dom";
import { fetchAllUsers } from "../services/userService";

export async function userLoader() {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) {
    return redirect("/login");
  }

  try {
    const users = await fetchAllUsers();
    const user = users.find((u) => u.id === currentUserID);

    if (!user || !user.isLoggedIn) {
      return redirect("/login");
    }

    return user;
  } catch (err) {
    // Throw so React Router's errorElement (ErrorBoundary) displays the message.
    throw new Error(err.message || "Failed to load user data. Please refresh.");
  }
}
