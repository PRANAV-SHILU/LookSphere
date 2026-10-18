import { createPost, getFeed, increasePostImpression, editPost, getPostById } from "../network/postApi";

// create post
export async function uploadUserPost(payload) {
  try {
    const res = await createPost(payload);
    return res;
  } catch (err) {
    throw new Error(err.message || "Failed to upload post.");
  }
}

// Feed posts
export async function fetchFeed(page, limit, search) {
  try {
    return await getFeed(page, limit, search);
  } catch (err) {
    throw new Error(err.message);
  }
}

// get post by id
export async function fetchPostById(id) {
  try {
    return await getPostById(id);
  } catch (err) {
    throw new Error(err.message);
  }
}

// increase post impression count
export async function trackPostImpression(id) {
  try {
    return await increasePostImpression(id);
  } catch (err) {
    console.error("[postService] Error tracking post impression for post", id, ":", err);
    throw new Error(err.message || "Failed to track post impression.");
  }
}

// edit post
export async function modifyPost(id, updateData) {
  try {
    return await editPost(id, updateData);
  } catch (err) {
    throw new Error(err.message || "Failed to edit post.");
  }
}
