import { redirect } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  const formData = await request.formData();

  const payload = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("payload", payload);

  try {
    await registerUser(payload);
    toast.success("Registration successful. Please log in.");
    return redirect("/login");
  } catch (err) {
    return { error: err.message || "Registration failed. Please try again." };
  }
}
