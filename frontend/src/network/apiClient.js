import axios from "axios";
import { toast } from "react-toastify";
import { setupCachingInterceptor } from "./cacheInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupCachingInterceptor(apiClient);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong. Please try again.";

    if (error.response) {
      const data = error.response.data;
      if (data?.errors && Array.isArray(data.errors)) {
        message = data.errors.map((e) => e.msg).join(", ");
      } else {
        message =
          data?.message ||
          data?.error ||
          `Server error (${error.response.status})`;
      }
    } else if (error.request) {
      message = "Network error. Please check your connection.";
    }
    toast.error(message);

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
