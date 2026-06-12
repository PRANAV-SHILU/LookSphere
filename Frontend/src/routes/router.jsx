import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout.jsx";
import PageNotFound from "../components/PageNotFound.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import Users from "../pages/Users.jsx";
import Profile from "../pages/Profile.jsx";
import Feed from "../pages/Feed.jsx";
import Explore from "../pages/Explore.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction.jsx";
import { editProfileAction } from "../actions/editProfileAction.jsx";
import { uploadAction } from "../actions/uploadAction.jsx";

import { authLoader } from "../loaders/authLoader.jsx";
import { profileLoader } from "../loaders/profileLoader.jsx";
import { usersLoader } from "../loaders/usersLoader.jsx";
import { feedLoader } from "../loaders/feedLoader.jsx";
import { editProfileLoader } from "../loaders/editProfileLoader.jsx";
import { redirectIfAuthenticated } from "../loaders/redirectIfAuthenticated.jsx";

const router = createBrowserRouter(
  [
    {
      id: "root",
      path: "/",
      Component: AppLayout,
      loader: authLoader,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, Component: Home },
        {
          path: "register",
          Component: Register,
          loader: redirectIfAuthenticated,
          action: registerAction,
        },
        {
          path: "login",
          Component: Login,
          loader: redirectIfAuthenticated,
          action: loginAction,
        },
        { path: "logout", action: logoutAction },
        { path: "users", Component: Users, loader: usersLoader },
        { path: "feed", Component: Feed, loader: feedLoader },
        { path: "explore", Component: Explore, loader: feedLoader },
        {
          path: "profile/:username?",  //optional username means it can be /profile or /profile/:username
          Component: Profile,
          loader: profileLoader,
          action: uploadAction,
        },
        {
          path: "edit-profile",
          Component: EditProfile,
          loader: editProfileLoader,
          action: editProfileAction,
        },
      ],
    },
    { path: "*", Component: PageNotFound },
  ],
  {
    basename: "/SecureAuth",
  },
);

export default router;
