import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 p-4 ml-64">
        {/* This is where the child routes render */}
        <Outlet />
      </div>
    </div>
  );
}
