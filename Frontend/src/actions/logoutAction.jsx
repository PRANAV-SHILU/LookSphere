import { redirect } from "react-router-dom";
import { logoutUser } from "../services/authService";

export async function logoutAction() {
  const confirmed = confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  const currentUserID = localStorage.getItem("currentUserID");

  try {
    if (currentUserID) {
      await logoutUser(currentUserID);
    }
  } catch (err) {
    // Even if the API call fails, clear the local session and redirect.
    // The user should never be stuck logged in due to a network error.
    console.error("Logout API error:", err.message);
  } finally {
    localStorage.removeItem("currentUserID");
  }

  return redirect("/login?logout=success");
}
