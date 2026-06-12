import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export async function fetchAdminMetrics() {
  try {
    const response = await apiClient.get(ENDPOINTS.ADMIN.METRICS);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch admin metrics");
  }
}
