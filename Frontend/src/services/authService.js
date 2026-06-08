import { register, login } from "../network/authApi";

export async function loginUser(email, password) {
  try {
    const res = await login({ email, password });
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

export async function logoutUser(userId) {
  throw new Error("Backend integration pending");
}
