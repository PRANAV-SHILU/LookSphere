export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  USER: {
    USERS: "/users",
    PROFILE: (username) => username ? `/users/profile/${username}` : "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
    CHANGE_EMAIL: "/users/change-email",
  },
  POST: {
    POSTS: "/posts",
    CREATE_POST: "/posts",
    GET_POST: (id) => `/posts/${id}`,
    INCREASE_POST_VIEW: (id) => `/posts/${id}/increment-view`,
    EDIT_POST: (id) => `/posts/${id}`,
  },
  ADMIN: {
    METRICS: "/admin/matrics",
  },
  CONTACT: {
    SUBMIT: "/contact_support/submit",
    MY_CONTACTS: (isResponded) => isResponded !== null && isResponded !== undefined ? `/contact_support/myContacts?isResponded=${isResponded}` : "/contact_support/myContacts",
    GET_CONTACTS: (isResponded) => isResponded !== null && isResponded !== undefined ? `/contact_support?isResponded=${isResponded}` : "/contact_support",
    RESPOND: (id) => `/contact_support/${id}/respond`,
  },
};

