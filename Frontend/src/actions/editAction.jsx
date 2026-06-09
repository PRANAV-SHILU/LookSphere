import { redirect } from "react-router-dom";
import { updateUserProfile } from "../services/userService";

export async function editAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const mobile = formData.get("mobile");

  try {
    await updateUserProfile(null, { name, mobile, password });

    return redirect("/profile");
  } catch (err) {
    return { error: err.message || "Failed to update profile. Please try again." };
  }
}
