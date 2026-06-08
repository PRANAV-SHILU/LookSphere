import { redirect } from "react-router-dom";
import { loginUser } from "../services/authService";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await loginUser(email, password);

    // TODO: Store real JWT tokens here

    return redirect("/dashboard");
  } catch (err) {
    return { error: err.message || "Login failed. Please try again." };
  }
}
