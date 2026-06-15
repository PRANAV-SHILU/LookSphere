import { redirect } from "react-router-dom";

export async function authLoader({ request }) {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    const url = new URL(request.url);

    // Define routes that guests are allowed to visit
    const publicRoutes = ["/", "/login", "/register"];

    // Strip basename for comparison
    const path = url.pathname.replace("/SecureAuth", "") || "/";

    if (!user && !publicRoutes.includes(path)) {
      return redirect("/login");
    }

    return user;
  } catch (err) {
    console.log("auth loader error:", err);
    throw new Error("Can't authenticate user, try again later");
  }
}
