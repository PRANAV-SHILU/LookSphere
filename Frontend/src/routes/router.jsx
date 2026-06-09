import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/profile.jsx";
import Edit from "../pages/Edit.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction.jsx";
import { editAction } from "../actions/editAction.jsx";

import { authLoader } from "../loaders/authLoader.jsx";
import { profileLoader } from "../loaders/profileLoader.jsx";
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
        { path: "profile", Component: Profile, loader: profileLoader },
        {
          path: "edit-profile",
          Component: Edit,
          loader: profileLoader,
          action: editAction,
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
