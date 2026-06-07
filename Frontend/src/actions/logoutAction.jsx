import { redirect } from "react-router-dom";
const url = "https://secureauth-api.onrender.com/users";
export async function logoutAction() {
  const res = confirm("Are you sure you want to logout?");
  if (!res) return;

  const currentUserID = localStorage.getItem("currentUserID");

  if (currentUserID) {
    const res = await fetch(`${url}/${currentUserID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLoggedIn: false }),
    });

    if (!res.ok) {
      throw res;
    }
  }

  localStorage.removeItem("currentUserID");

  return redirect("/login?logout=success");
}
