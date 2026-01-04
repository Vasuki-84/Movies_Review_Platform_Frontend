import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">

      {/* Sidebar Overlay (for mobile) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed z-30 top-0 left-0 h-full bg-gray-800 text-white p-5 pt-20 transform transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 w-48 md:w-56 lg:w-60`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-48 lg:ml-60 bg-gray-900 text-white">

        {/* Mobile Top Navbar */}
        <div className="md:hidden flex items-center justify-between bg-gray-900 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 pt-6 md:pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
