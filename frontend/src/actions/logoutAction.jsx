import { redirect } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";

export async function logoutAction() {
  try {
    await logoutUser();
    toast.success("logged out successfully");
  } catch (err) {
    console.error("Logout API error:", err.message);
  } finally {
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
  }

  return redirect("/login");
}
