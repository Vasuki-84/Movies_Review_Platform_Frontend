import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black ">
      <div
        className={`fixed inset-0 bg-black bg-black/50 z-20 md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* sidebar */}
      <div
        className={`fixed  top-0 left-0 z-30 h-screen w-64 bg-gray-800 text-white p-5  transform transition-transform 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  md:translate-x-0 `}
      >
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-h-screen  md:ml-64 bg-gray-900 text-white">
        <div
          className=" fixed top-16 left-0 right-0 z-20 md:hidden lg:hidden
          flex items-center justify-between bg-gray-900 p-4"
        >
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <EllipsisHorizontalCircleIcon className="w-6 h-6 text-white" />
          </button>
          <span className="font-bold text-lg ">Admin Panel</span>
        </div>

        <div className="flex-1 p-6 md:p-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
