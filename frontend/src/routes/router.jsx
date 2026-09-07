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
const TermsAndConditions = lazy(
  () => import("../pages/TermsAndConditions.jsx"),
);
const WhatsNew = lazy(() => import("../pages/WhatsNew.jsx"));
const FAQ = lazy(() => import("../pages/FAQ.jsx"));
const About = lazy(() => import("../pages/About.jsx"));
const Roadmap = lazy(() => import("../pages/Roadmap.jsx"));
const ContactUs = lazy(() => import("../pages/ContactUs.jsx"));
const AdminContact = lazy(() => import("../pages/AdminContact.jsx"));
const MyInquiries = lazy(() => import("../pages/MyInquiries.jsx"));
const Settings = lazy(() => import("../pages/Settings.jsx"));
const ChangePassword = lazy(() => import("../pages/ChangePassword.jsx"));
const ChangeEmail = lazy(() => import("../pages/ChangeEmail.jsx"));
const PostDetail = lazy(() => import("../pages/PostDetail.jsx"));

import FeedSkeleton from "../skeletons/FeedSkeleton.jsx";
import ExploreSkeleton from "../skeletons/ExploreSkeleton.jsx";
import ProfileSkeleton from "../skeletons/ProfileSkeleton.jsx";
import CreatorsSkeleton from "../skeletons/CreatorsSkeleton.jsx";
import MyInquiriesSkeleton from "../skeletons/MyInquiriesSkeleton.jsx";
import PageLoader from "../shared-components/PageLoader.jsx";

import { registerAction } from "../actions/registerAction";
import { loginAction } from "../actions/loginAction";
import { logoutAction } from "../actions/logoutAction.jsx";
import { editProfileAction } from "../actions/editProfileAction.jsx";
import { uploadAction } from "../actions/uploadAction.jsx";
import { contactAction } from "../actions/contactAction.jsx";
import { changePasswordAction } from "../actions/changePasswordAction.jsx";
import { changeEmailAction } from "../actions/changeEmailAction.jsx";

import { authLoader } from "../loaders/authLoader.jsx";
import { profileLoader } from "../loaders/profileLoader.jsx";
import { creatorsLoader } from "../loaders/creatorsLoader.jsx";
import { feedLoader } from "../loaders/feedLoader.jsx";
import { editProfileLoader } from "../loaders/editProfileLoader.jsx";
import { redirectIfAuthenticated } from "../loaders/redirectIfAuthenticated.jsx";
import { dashboardLoader } from "../loaders/dashboardLoader.jsx";
import { adminContactLoader } from "../loaders/adminContactLoader.jsx";
import { myInquiriesLoader } from "../loaders/myInquiriesLoader.jsx";
import { postDetailLoader } from "../loaders/postDetailLoader.jsx";

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
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
        loader: redirectIfAuthenticated,
        action: registerAction,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
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
        path: "posts/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PostDetail />
          </Suspense>
        ),
        loader: postDetailLoader,
      },
      {
        path: "admin/dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
        loader: dashboardLoader,
      },
      {
        path: "admin/contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminContact />
          </Suspense>
        ),
        loader: adminContactLoader,
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
          <Suspense fallback={<PageLoader />}>
            <EditProfile />
          </Suspense>
        ),
        loader: editProfileLoader,
        action: editProfileAction,
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "terms-and-conditions",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "whats-new",
        element: (
          <Suspense fallback={<PageLoader />}>
            <WhatsNew />
          </Suspense>
        ),
      },
      {
        path: "roadmap",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Roadmap />
          </Suspense>
        ),
      },
      {
        path: "contact-us",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactUs />
          </Suspense>
        ),
        action: contactAction,
      },
      {
        path: "my-inquiries",
        element: (
          <Suspense fallback={<MyInquiriesSkeleton />}>
            <MyInquiries />
          </Suspense>
        ),
        loader: myInquiriesLoader,
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "settings/change-password",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChangePassword />
          </Suspense>
        ),
        action: changePasswordAction,
      },
      {
        path: "settings/change-email",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ChangeEmail />
          </Suspense>
        ),
        action: changeEmailAction,
      },
    ],
  },
  { path: "*", Component: PageNotFound },
]);

export default router;
