import { register, login } from "../network/authApi";

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

export async function logoutUser(username) {
  throw new Error("Backend integration pending");
}
