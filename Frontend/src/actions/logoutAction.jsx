import { redirect } from "react-router-dom";
import { logoutUser } from "../services/authService";

export async function logoutAction() {
  const confirmed = confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  try {
    await logoutUser();
  } catch (err) {
    console.error("Logout API error:", err.message);
  } finally {
    // TODO: Clear real JWT tokens here
  }

  return redirect("/login?logout=success");
}
