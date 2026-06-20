import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

// Feed
export async function getFeed() {
  try {
    const res = await apiClient.get(ENDPOINTS.POST.POSTS);
    // console.log("feed posts", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

//create post
export async function createPost(formData) {
  try {
    const res = await apiClient.post(ENDPOINTS.POST.CREATE_POST, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("created post", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

// increase post view count
export async function increasePostView(id) {
  try {
    const res = await apiClient.patch(ENDPOINTS.POST.INCREASE_POST_VIEW(id));
    // console.log("post view increased", res.data.data);
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

// edit post
export async function editPost(id, updateData) {
  try {
    const res = await apiClient.patch(ENDPOINTS.POST.EDIT_POST(id), updateData);
    // console.log("post edited", res.data);
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}
