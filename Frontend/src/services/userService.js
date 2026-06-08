import { getAllUsers, getUserById, updateUser } from "../network/userApi";

export async function fetchAllUsers() {
  return getAllUsers();
}

export async function fetchCurrentUser(userId) {
  try {
    return await getUserById(userId);
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}

export async function updateUserProfile(userId, data) {
  return updateUser(userId, data);
}
