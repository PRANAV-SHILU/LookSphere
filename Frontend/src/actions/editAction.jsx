import { redirect } from "react-router-dom";
import { updateUserProfile } from "../services/userService";

export async function editAction({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const tagline = formData.get("tagline");
  const bio = formData.get("bio");
  const profileImage = formData.get("profileImage");

  try {
    const payload = new FormData();
    payload.append("username", username);
    payload.append("email", email);
    payload.append("tagline", tagline);
    payload.append("bio", bio);
    if (profileImage && profileImage.size > 0) {
      payload.append("profileImage", profileImage);
    }

    const updatedUser = await updateUserProfile(payload);

    // Update localStorage so the edit profile page & other consumers stay in sync
    const stored = localStorage.getItem("user");
    const existing = stored ? JSON.parse(stored) : {};
    localStorage.setItem("user", JSON.stringify({ ...existing, ...updatedUser }));

    return redirect("/profile");
  } catch (err) {
    return { error: err.message || "Failed to update profile. Please try again." };
  }
}
