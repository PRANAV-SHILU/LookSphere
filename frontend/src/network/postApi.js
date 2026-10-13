import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

// Feed
export async function getFeed(page, limit, search) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const url = queryString ? `${ENDPOINTS.POST.POSTS}?${queryString}` : ENDPOINTS.POST.POSTS;
    const res = await apiClient.get(url);
    // console.log("feed posts", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
}

// get post by id
export async function getPostById(id) {
  try {
    const res = await apiClient.get(ENDPOINTS.POST.GET_POST(id));
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

// increase post impression count
export async function increasePostImpression(id) {
  try {
    const res = await apiClient.patch(ENDPOINTS.POST.INCREASE_POST_IMPRESSION(id));
    // console.log("post impression increased", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("[postApi] Error in increasePostImpression for post", id, ":", err.response?.data || err.message);
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
