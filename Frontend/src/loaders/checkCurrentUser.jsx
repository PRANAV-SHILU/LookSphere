import { redirect } from "react-router-dom";

const url = "https://secureauth-api.onrender.com/users";
// const url = "http://localhost:3000/users";

export async function checkCurrentUser() {
  const currentUserID = localStorage.getItem("currentUserID");

  if (!currentUserID) {
    return { isLoggedIn: false, user: null };
  }

  try {
    const res = await fetch(`${url}/${currentUserID}`);

    // If the server says the user doesn't exist, clear the stale ID and
    // redirect to home instead of throwing an error that shows the router's
    // error page.
    if (!res.ok) {
      if (res.status === 404) {
        localStorage.removeItem("currentUserID");
        return redirect("/");
      }
      throw res;
    }

    const user = await res.json();

    if (!user.isLoggedIn) {
      localStorage.removeItem("currentUserID");
      return { isLoggedIn: false, user: null };
    }

    return { isLoggedIn: true, name: user.name };
  } catch (err) {
    // Network errors or unexpected failures: clear the stale ID and let the
    // app handle it as not-logged-in (avoid showing the router error page).
    console.error("checkCurrentUser error:", err);
    localStorage.removeItem("currentUserID");
    return { isLoggedIn: false, user: null };
  }
}
