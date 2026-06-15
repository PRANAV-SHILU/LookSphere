import { redirect } from "react-router-dom";

export const redirectIfAuthenticated = () => {
  const user = localStorage.getItem("user");
  
  if (user) {
    // If user is already logged in, redirect them to the profile page
    return redirect("/profile");
  }
  
  return null;
};
