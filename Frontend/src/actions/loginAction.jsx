import { redirect } from "react-router-dom";
import { loginUser } from "../services/authService";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const mobile = formData.get("mobile");
  const password = formData.get("password");

  try {
    const result = await loginUser(mobile, password);

    if (!result.success) {
      return { error: result.error };
    }

    localStorage.setItem("currentUserID", result.userId);
    return redirect("/dashboard?loggedin=success");
  } catch (err) {
    return { error: err.message || "Login failed. Please try again." };
  }
}
