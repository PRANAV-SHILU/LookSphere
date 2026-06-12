import { redirect } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const payload = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  console.log("Payload", payload);
  try {
    const response = await loginUser(payload);
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Login success, enjoyyyyy!");
    if (user.role === "admin") {
      return redirect("/dashboard");
    }
    return redirect("/profile");
  } catch (err) {
    return { error: err.message || "Login failed. Please try again." };
  }
}
