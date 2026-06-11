import { createPost, getAllPosts, getPostById, deletePost } from "../network/postApi";

export async function uploadUserPost(payload) {
  try {
    const res = await createPost(payload);
    return res;
  } catch (err) {
    throw new Error(err.message || "Failed to upload post.");
  }
}

export async function fetchAllPosts() {
  try {
    return await getAllPosts();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchPostById(id) {
  try {
    return await getPostById(id);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function removePost(id) {
  try {
    return await deletePost(id);
  } catch (err) {
    throw new Error(err.message);
  }
}
