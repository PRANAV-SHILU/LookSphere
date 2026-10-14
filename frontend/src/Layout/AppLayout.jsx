import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ContactFormProvider } from "../context/ContactFormContext";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isNoPaddingPage =
    location.pathname === "/feed" ||
    location.pathname === "/explore" ||
    location.pathname.startsWith("/profile") ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/contact";

  return (
    <ContactFormProvider>
      <div className="app-container min-h-screen flex flex-col">
        {isLoading && <div className="top-loading-bar" />}
        <Header />
        <main
          className={`main-content grow ${isNoPaddingPage ? "px-0" : "px-2 sm:px-4 md:px-8"}`}
        >
          <Outlet key={location.pathname} />
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={1700}
          limit={1}
          theme="dark"
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          draggable={false}
          closeOnClick={true}
        />
        <Analytics />
        <SpeedInsights />
      </div>
    </ContactFormProvider>
  );
}
