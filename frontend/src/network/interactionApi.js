import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export async function toggleInteraction(postId, action) {
  try {
    const res = await apiClient.post(ENDPOINTS.INTERACTION.TOGGLE, { postId, action });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUserInteractions(userId, action) {
  try {
    const res = await apiClient.get(ENDPOINTS.INTERACTION.BY_USER(userId, action));
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPostInteractions(postId, action) {
  try {
    const res = await apiClient.get(ENDPOINTS.INTERACTION.BY_POST(postId, action));
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const interactionApi = {
  toggleInteraction,
  getUserInteractions,
  getPostInteractions,
};
