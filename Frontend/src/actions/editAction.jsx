import { redirect } from "react-router-dom";
import { fetchAllUsers, updateUserProfile } from "../services/userService";

export async function editAction({ request }) {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) return redirect("/login");

  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const mobile = formData.get("mobile");

  try {
    // Check if the new mobile number is already taken by another user
    const users = await fetchAllUsers();
    const mobileExists = users.some(
      (u) => u.mobile === mobile && u.id !== currentUserID,
    );

    if (mobileExists) {
      return { error: "Mobile number already exists" };
    }

    await updateUserProfile(currentUserID, { name, mobile, password });

    return redirect("/dashboard?edited=success");
  } catch (err) {
    return { error: err.message || "Failed to update profile. Please try again." };
  }
}
