import { fetchAdminMetrics } from "../network/adminApi";

export async function getAdminMetrics() {
  try {
    const data = await fetchAdminMetrics();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
