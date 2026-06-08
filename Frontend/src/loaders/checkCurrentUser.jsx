import { redirect } from "react-router-dom";
import { fetchCurrentUser } from "../services/userService";

export async function checkCurrentUser() {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) {
    return { isLoggedIn: false, user: null };
  }

  try {
    const user = await fetchCurrentUser(currentUserID);

    // fetchCurrentUser returns null on 404 — clear the stale id
    if (!user) {
      localStorage.removeItem("currentUserID");
      return redirect("/");
    }

    if (!user.isLoggedIn) {
      localStorage.removeItem("currentUserID");
      return { isLoggedIn: false, user: null };
    }

    return { isLoggedIn: true, name: user.name };
  } catch (err) {
    // Network errors or unexpected failures — clear stale id and treat as
    // logged-out to avoid showing the router error page.
    console.error("checkCurrentUser error:", err);
    localStorage.removeItem("currentUserID");
    return { isLoggedIn: false, user: null };
  }
}
