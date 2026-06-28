import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "../Layout/AppLayout.jsx";
import PageNotFound from "../components/PageNotFound.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const EditProfile = lazy(() => import("../pages/EditProfile.jsx"));
const Creators = lazy(() => import("../pages/Creators.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const Feed = lazy(() => import("../pages/Feed.jsx"));
const Explore = lazy(() => import("../pages/Explore.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy.jsx"));
const TermsAndCondition = lazy(() => import("../pages/TermsAndCondition.jsx"));

import FeedSkeleton from "../skeletons/FeedSkeleton.jsx";
import ExploreSkeleton from "../skeletons/ExploreSkeleton.jsx";
import ProfileSkeleton from "../skeletons/ProfileSkeleton.jsx";
import DashboardSkeleton from "../skeletons/DashboardSkeleton.jsx";
import CreatorsSkeleton from "../skeletons/CreatorsSkeleton.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction.jsx";
import { editProfileAction } from "../actions/editProfileAction.jsx";
import { uploadAction } from "../actions/uploadAction.jsx";

import { authLoader } from "../loaders/authLoader.jsx";
import { profileLoader } from "../loaders/profileLoader.jsx";
import { creatorsLoader } from "../loaders/creatorsLoader.jsx";
import { feedLoader } from "../loaders/feedLoader.jsx";
import { editProfileLoader } from "../loaders/editProfileLoader.jsx";
import { redirectIfAuthenticated } from "../loaders/redirectIfAuthenticated.jsx";
import { dashboardLoader } from "../loaders/dashboardLoader.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    loader: authLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <Register />
          </Suspense>
        ),
        loader: redirectIfAuthenticated,
        action: registerAction,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <Login />
          </Suspense>
        ),
        loader: redirectIfAuthenticated,
        action: loginAction,
      },
      { path: "logout", action: logoutAction },
      {
        path: "creators",
        element: (
          <Suspense fallback={<CreatorsSkeleton />}>
            <Creators />
          </Suspense>
        ),
        loader: creatorsLoader,
      },
      {
        path: "feed",
        element: (
          <Suspense fallback={<FeedSkeleton />}>
            <Feed />
          </Suspense>
        ),
        loader: feedLoader(10),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
        loader: dashboardLoader,
      },
      {
        path: "explore",
        element: (
          <Suspense fallback={<ExploreSkeleton />}>
            <Explore />
          </Suspense>
        ),
        loader: feedLoader(20),
      },
      {
        path: "profile/:username?", //optional username means it can be /profile or /profile/:username
        element: (
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        ),
        loader: profileLoader,
        action: uploadAction,
      },
      {
        path: "edit-profile",
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <EditProfile />
          </Suspense>
        ),
        loader: editProfileLoader,
        action: editProfileAction,
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "terms-and-condition",
        element: (
          <Suspense fallback={<div className="top-loading-bar" />}>
            <TermsAndCondition />
          </Suspense>
        ),
      },
    ],
  },
  { path: "*", Component: PageNotFound },
]);

export default router;
