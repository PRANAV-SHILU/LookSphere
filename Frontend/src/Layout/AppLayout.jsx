import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="app-container">
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
