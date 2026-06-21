import { createPost, getFeed, increasePostView, editPost } from "../network/postApi";

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
export async function fetchFeed(page, limit) {
  try {
    return await getFeed(page, limit);
  } catch (err) {
    throw new Error(err.message);
  }
}

// increase post view count
export async function trackPostView(id) {
  try {
    return await increasePostView(id);
  } catch (err) {
    throw new Error(err.message || "Failed to track post view.");
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
