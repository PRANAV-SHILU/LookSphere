import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export async function getAllUsers() {
  const response = await apiClient.get(ENDPOINTS.USER.USERS);
  return response.data;
}

export async function getUserById(id) {
  const response = await apiClient.get(ENDPOINTS.USER.PROFILE(id));
  return response.data;
}

export async function createUser(userData) {
  const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
  return response.data;
}

export async function updateUser(id, updates) {
  const response = await apiClient.patch(
    ENDPOINTS.USER.PROFILE(id),
    updates,
  );
  return response.data;
}
