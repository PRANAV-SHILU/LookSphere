import { redirect } from "react-router-dom";
import { updateUserProfile } from "../services/userService";
import { toast } from "react-toastify";

export async function editProfileAction({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");
  const email = formData.get("email");
  const tagline = formData.get("tagline");
  const bio = formData.get("bio");
  const profileImage = formData.get("profileImage");

  // console.log(profileImage);

  try {
    const stored = localStorage.getItem("user");
    const existing = stored ? JSON.parse(stored) : {};

    const payload = new FormData();

    if (username && username !== existing.username) {
      payload.append("username", username);
    }
    if (email && email !== existing.email) {
      payload.append("email", email);
    }
    if (tagline !== undefined && tagline !== (existing.tagline || "")) {
      payload.append("tagline", tagline);
    }
    if (bio !== undefined && bio !== (existing.bio || "")) {
      payload.append("bio", bio);
    }
    if (profileImage && profileImage.size > 0) {
      payload.append("profileImage", profileImage);
    }

    // Check if there are any changes to submit
    const hasChanges = Array.from(payload.keys()).length > 0;

    if (!hasChanges) {
      toast.info("No changes to update.");
      return redirect("/profile");
    }

    const updatedUser = await updateUserProfile(payload);

    localStorage.setItem(
      "user",
      JSON.stringify({ ...existing, ...updatedUser.data }),
    );

    // If username changed, backend returns a new token - update localStorage
    if (updatedUser.token) {
      localStorage.setItem("jwtToken", updatedUser.token);
    }

    toast.success("Profile updated successfully!");
    return redirect("/profile");
  } catch (err) {
    const errorMessage = err.message || "Failed to update profile. Please try again.";
    toast.error(errorMessage);
    return {
      error: errorMessage,
    };
  }
}
