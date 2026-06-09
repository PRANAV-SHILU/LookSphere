import { redirect } from "react-router-dom";
import { logoutUser } from "../services/authService";

export async function logoutAction() {

  try {
    await logoutUser();
  } catch (err) {
    console.error("Logout API error:", err.message);
  } finally {
    // localStorage.removeItem("user");
  }

  return redirect("/login?logout=success");
}
