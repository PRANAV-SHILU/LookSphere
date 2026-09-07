import { redirect } from "react-router-dom";
import { changeEmail } from "../network/userApi";
import { toast } from "react-toastify";

export async function changeEmailAction({ request }) {
  const formData = await request.formData();

  const newEmail = formData.get("newEmail")?.trim();
  const password = formData.get("password");

  // Validate required fields
  if (!newEmail || !password) {
    toast.error("All fields are required.");
    return { error: "All fields are required." };
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    toast.error("Please enter a valid email address.");
    return { error: "Invalid email address." };
  }

  try {
    await changeEmail({ newEmail, password });

    // Update email in localStorage so authLoader & UI immediately reflect the change
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const existing = JSON.parse(stored);
        existing.email = newEmail.toLowerCase();
        localStorage.setItem("user", JSON.stringify(existing));
      } catch (storageErr) {
        console.error("Failed to update user in localStorage:", storageErr);
      }
    }

    toast.success("Email updated successfully!");
    return redirect("/settings");
  } catch (err) {
    // Error toast is already handled by apiClient interceptor
    return { error: err.message || "Failed to change email." };
  }
}