import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export async function getAllUsers() {
  try {
    const res = await apiClient.get(ENDPOINTS.USER.USERS);
    console.log("all users", res);
    return res.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getOwnProfile() {
  try {
    const res = await apiClient.get(ENDPOINTS.USER.OWN_PROFILE);
    console.log("own profile", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserByUsername(username) {
  try {
    const res = await apiClient.get(ENDPOINTS.USER.PROFILE(username));
    console.log("public profile", res.data.data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateOwnProfile(formData) {
  throw new Error("Backend integration pending");
}
