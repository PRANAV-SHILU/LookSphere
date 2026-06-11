import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="app-container">
      {isLoading && <div className="top-loading-bar" />}
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <ToastContainer position="top-right" autoClose={3000} limit={1} theme="dark" />
    </div>
  );
}
