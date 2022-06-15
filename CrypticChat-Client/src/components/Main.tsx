import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  return (
    <div className="flex w-5/6 h-full text-black bg-gray-100">
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
