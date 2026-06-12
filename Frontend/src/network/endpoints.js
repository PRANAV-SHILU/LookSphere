export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  USER: {
    USERS: "/users",
    PROFILE: (username) => username ? `/users/profile/${username}` : "/users/profile",
    USER_DETAIL: (id) => `/users/${id}/detail`,
  },
  POST: {
    POSTS: "/posts",
    CREATE_POST: "/posts",
    DELETE_POST: (id) => `/posts/${id}`, // not used
    INCREASE_POST_VIEW: (id) => `/posts/${id}/views`,
    EDIT_POST: (id) => `/posts/${id}`,
  },
  ADMIN: {
    METRICS: "/admin/matrics",
  },
};
