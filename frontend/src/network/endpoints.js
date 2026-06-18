export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  USER: {
    USERS: "/users",
    PROFILE: (username) => username ? `/users/profile/${username}` : "/users/profile",
  },
  POST: {
    POSTS: "/posts",
    CREATE_POST: "/posts",
    INCREASE_POST_VIEW: (id) => `/posts/${id}/increment-view`,
    EDIT_POST: (id) => `/posts/${id}`,
  },
  ADMIN: {
    METRICS: "/admin/matrics",
  },
};
