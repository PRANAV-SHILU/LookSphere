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

export async function getProfile(username) {
  try {
    const res = await apiClient.get(ENDPOINTS.USER.PROFILE(username));
    console.log("profile", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateOwnProfile(payload) {
  try {
    const res = await apiClient.patch(ENDPOINTS.USER.PROFILE(), payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("updated profile", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserDetail(id) {
  try {
    const res = await apiClient.get(ENDPOINTS.USER.USER_DETAIL(id));
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}
