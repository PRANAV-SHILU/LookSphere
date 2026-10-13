import { redirect } from "react-router-dom";

export async function authLoader({ request }) {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    const url = new URL(request.url);

    // Define routes that guests are allowed to visit
    const publicRoutes = [
      "/",
      "/login",
      "/register",
      "/privacy-policy",
      "/terms-and-conditions",
      "/faq",
      "/about-us",
      "/whats-new",
      "/roadmap"
    ];

    const path = url.pathname || "/";

    const isPublicRoute =
      publicRoutes.includes(path) ||
      path.startsWith("/posts/");

    if (!user && !isPublicRoute) {
      return redirect("/login");
    }

    return user;
  } catch (err) {
    console.log("auth loader error:", err);
    throw new Error("Can't authenticate user, try again later");
  }
}
