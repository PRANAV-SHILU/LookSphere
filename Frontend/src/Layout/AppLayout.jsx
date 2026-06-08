import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="page-container">
        {/*
          AnimatePresence with mode="wait" enables page transition animations.
          The location.pathname key forces re-mount (and therefore re-animation)
          on every route change.
        */}
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
    </>
  );
}
