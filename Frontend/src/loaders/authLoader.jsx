import { redirect } from "react-router-dom";

export async function authLoader({ request }) {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const url = new URL(request.url);

  // Define public routes that guests are allowed to visit
  const publicRoutes = ["/", "/login", "/register"];

  if (!user && !publicRoutes.includes(url.pathname)) {
    return redirect("/login");
  }

  return user;
}
