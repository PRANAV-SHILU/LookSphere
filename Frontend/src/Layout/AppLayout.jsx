import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
