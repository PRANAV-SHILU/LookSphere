import { getAllUsers, getProfile, updateOwnProfile } from "../network/userApi";

export async function fetchAllUsers(search) {
  try {
    const res = await getAllUsers(search);
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

