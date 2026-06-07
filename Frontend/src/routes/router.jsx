import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layout/AppLayout.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Edit from "../pages/Edit.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction.jsx";
import { editAction } from "../actions/editAction.jsx";

import { userLoader } from "../loaders/userLoader.jsx";
import { checkCurrentUser } from "../loaders/checkCurrentUser.jsx";
import ColorMixer from "../pages/ColorMixer.jsx";

const router = createBrowserRouter(
  [
    {
      id: "root",
      path: "/",
      Component: AppLayout,
      loader: checkCurrentUser,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, Component: Home },
        { path: "login", Component: Login, action: loginAction },
        { path: "register", Component: Register, action: registerAction },
        {
          path: "dashboard",
          Component: Dashboard,
          loader: userLoader,
          action: logoutAction,
        },
        { path: "colormixer", Component: ColorMixer, loader: userLoader },
        {
          path: "edit",
          Component: Edit,
          loader: userLoader,
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
