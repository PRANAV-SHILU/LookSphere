import { redirect } from "react-router-dom";
import { getAdminMetrics } from "../services/adminService";

export async function dashboardLoader() {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      return redirect("/login");
    }

    if (user.role !== "admin") {
      return redirect("/profile");
    }

    const res = await getAdminMetrics();
    // Return data property of the response
    return res.data || res;
  } catch (error) {
    console.error("Dashboard loader error:", error);
    throw new Error(error.message || "Failed to load dashboard data");
  }
}
