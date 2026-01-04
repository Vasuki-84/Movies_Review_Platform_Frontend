import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-5 mt-20">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/layout">Dashboard</Link></li>
        <li><Link to="/admin/layout/create">Create Movie</Link></li>
        <li><Link to="/admin/layout/update">Update Movie</Link></li>
        <li><Link to="/admin/layout/reviews">Reviews</Link></li>
      </ul>
    </div>
  );
}
