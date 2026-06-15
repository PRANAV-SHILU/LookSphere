import { register, login, logout } from "../network/authApi";

export async function loginUser(payload) {
  try {
    const res = await login(payload);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

// DONE
export async function registerUser(payload) {
  try {
    const res = await register(payload);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logoutUser() {
  try {
    const res = await logout();
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}
