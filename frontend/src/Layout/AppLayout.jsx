import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isNoPaddingPage = location.pathname === "/feed" || location.pathname === "/explore" || location.pathname.startsWith("/profile");

  return (
    <div className="app-container">
      {isLoading && <div className="top-loading-bar" />}
      <Header />
      <main className={`main-content ${isNoPaddingPage ? "px-0" : "px-2 sm:px-4 md:px-8"}`}>
        <Outlet key={location.pathname} />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        theme="dark"
      />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
