import { redirect } from "react-router-dom";
import { registerUser } from "../services/authService";

export async function registerAction({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await registerUser(username, email, password);
    return redirect("/login?registered=success");
  } catch (err) {
    return { error: err.message || "Registration failed. Please try again." };
  }
}
