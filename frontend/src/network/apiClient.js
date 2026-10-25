import axios from "axios";
import { toast } from "react-toastify";
import { setupCachingInterceptor } from "./cacheInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 second timeout to prevent indefinite hangs
  headers: {
    "Content-Type": "application/json",
  },
});

setupCachingInterceptor(apiClient);

apiClient.interceptors.request.use(
  (config) => {
    // Fast-fail if browser is completely offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const err = new Error("Network disconnected. Please check your internet connection.");
      err.isOffline = true;
      return Promise.reject(err);
    }

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

    // Check if browser is offline or fast-failed
    if ((typeof navigator !== "undefined" && !navigator.onLine) || error.isOffline) {
      message = "Network disconnected. Please check your internet connection.";
      toast.error(message);
      return Promise.reject(new Error(message));
    }

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      const rawBackendMessage =
        (data?.errors && Array.isArray(data.errors) && data.errors.map((e) => e.msg).join(", ")) ||
        data?.message ||
        data?.error ||
        "";

      // Sanitize raw technical database/driver errors leaking from the backend
      const lower = rawBackendMessage.toLowerCase();
      if (
        lower.includes("enotfound") ||
        lower.includes("getaddrinfo") ||
        lower.includes("buffering timed out") ||
        lower.includes("mongodb.net") ||
        lower.includes("operation `") ||
        lower.includes("mongonetworkerror") ||
        lower.includes("econnrefused")
      ) {
        message = "Server is unable to connect to the database. Check backend connection.";
      } else if (rawBackendMessage) {
        message = rawBackendMessage;
      } else if (status === 401) {
        message = "Session expired or unauthorized. Please log in again.";
      } else if (status === 403) {
        message = "Access denied. You do not have permission for this action.";
      } else if (status === 404) {
        message = "Requested resource not found.";
      } else if (status >= 500) {
        message = "Internal server error. Please try again.";
      } else {
        message = `Request failed (${status}).`;
      }
    } else if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      message = "Connection timed out. Server is taking too long to respond. Check your connection and try again.";
    } else if (error.request) {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        message = "You are offline. Please check your internet connection.";
      } else {
        message = "Backend server is unavailable. Please try again.";
      }
    } else {
      message = error.message || "An unexpected error occurred.";
    }

    toast.error(message);
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
