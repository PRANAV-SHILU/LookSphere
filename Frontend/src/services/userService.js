import { getAllUsers, getOwnProfile, getUserByUsername, updateOwnProfile } from "../network/userApi";

export async function fetchAllUsers() {
  try {
    const res = await getAllUsers();
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchOwnProfile() {
  try {
    const res = await getOwnProfile();
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchPublicProfile(username) {
  try {
    const res = await getUserByUsername(username);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function updateUserProfile(userId, data) {
  throw new Error("Backend integration pending");
}
