import { redirect } from "react-router-dom";
import { registerUser } from "../services/authService";

export async function registerAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const mobile = formData.get("mobile");
  const password = formData.get("password");

  try {
    const result = await registerUser(name, mobile, password);

    if (!result.success) {
      return { error: result.error };
    }

    return redirect("/login?registered=success");
  } catch (err) {
    return { error: err.message || "Registration failed. Please try again." };
  }
}
