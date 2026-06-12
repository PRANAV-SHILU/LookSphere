export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  USER: {
    USERS: "/users",
    OWN_PROFILE: "/users/profile",
    PROFILE: (username) => `/users/profile/${username}`,
    UPDATE_PROFILE: "/users/profile",
  },
  POST: {
    POSTS: "/posts",
    CREATE_POST: "/posts",
    DELETE_POST: (id) => `/posts/${id}`, // not used
    INCREASE_POST_VIEW: (id) => `/posts/${id}/views`,
  },
};
