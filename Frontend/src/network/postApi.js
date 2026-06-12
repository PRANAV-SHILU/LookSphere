import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

// Not used anywhere currently
export async function getAllPosts() {
  try {
    const res = await apiClient.get(ENDPOINTS.POST.POSTS);
    console.log("all posts", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}


export async function createPost(formData) {
  try {
    const res = await apiClient.post(ENDPOINTS.POST.CREATE_POST, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("created post", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

// Not used anywhere currently
export async function deletePost(id) {
  try {
    const res = await apiClient.delete(ENDPOINTS.POST.DELETE_POST(id));
    console.log("deleted post", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function increasePostView(id) {
  try {
    const res = await apiClient.patch(ENDPOINTS.POST.INCREASE_POST_VIEW(id));
    console.log("post view increased", res.data.data);
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}
