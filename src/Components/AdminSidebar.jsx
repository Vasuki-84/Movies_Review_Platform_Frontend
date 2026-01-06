import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function AdminSidebar({ closeSidebar }) {
  return (
    <div className=" h-full bg-black text-white p-5 mt-10 ">
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-xl font-bold">Admin</h2>
        <button
          onClick={closeSidebar}
          className="text-2xl font-bold"
          aria-label="Close sidebar"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <h2 className="hidden md:block text-xl font-bold mb-6">Admin</h2>
    
      <ul className="space-y-2">
  {[
    { name: "Dashboard", path: "/admin/layout" },
    { name: "Create Movie", path: "/admin/layout/create" },
    { name: "Update Movie", path: "/admin/layout/update" },
    { name: "Reviews", path: "/admin/layout/reviews" },
  ].map((item) => (
    <li key={item.name}>
      <Link
        to={item.path}
        className="
          block px-4 py-2 rounded-lg
          text-gray-300
          hover:bg-white hover:text-black
          transition-all duration-200
          relative
        "
      >
       
        <span className="
          absolute left-0 top-0 h-full w-1
          bg-blue-500
          rounded-r
          opacity-0
          group-hover:opacity-100
        " />

        {item.name}
      </Link>
    </li>
  ))}
</ul>
    </div>
  );
}
