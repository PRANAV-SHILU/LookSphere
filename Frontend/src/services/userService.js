import { getAllUsers, getProfile, updateOwnProfile, getUserDetail } from "../network/userApi";

export async function fetchAllUsers() {
  try {
    const res = await getAllUsers();
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchProfile(username) {
  try {
    const res = await getProfile(username);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateUserProfile(payload) {
  try {
    const res = await updateOwnProfile(payload);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchUserDetail(id) {
  try {
    const res = await getUserDetail(id);
    return res;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch user details.");
  }
}
