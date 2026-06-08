export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/users",
    LOGIN: "/users",
  },

  USER: {
    PROFILE: (id) => `/users/${id}`,
    USERS: "/users",
  },
};
