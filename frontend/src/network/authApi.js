import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

// done
export async function register(userData) {
  try {
    const res = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    console.log("Register user", res);
    return res.data;
  } catch (err) {
    console.log("register user error", err);
    throw new Error(err.message);
  }
}

export async function login(credentials) {
  try {
    const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    console.log("login user", res);
    return res.data;
  } catch (err) {
    console.log("login error", err);
    throw new Error(err.message);
  }
}

export async function logout() {
  try {
    const res = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    console.log("logout user", res);
    return res.data;
  } catch (err) {
    console.log("logout error", err);
    throw new Error(err.message);
  }
}
