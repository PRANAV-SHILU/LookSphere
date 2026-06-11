import { redirect } from "react-router-dom";

export async function editProfileLoader() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) return redirect("/login");

  // Wrap in the same shape EditProfile expects from useLoaderData()
  return { data: { user } };
}
