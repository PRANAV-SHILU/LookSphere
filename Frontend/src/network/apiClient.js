import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong. Please try again.";

    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server error (${error.response.status})`;
    } else if (error.request) {
      message = "Network error. Please check your connection.";
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
