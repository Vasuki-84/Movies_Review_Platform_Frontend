import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <ul className="space-y-4">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/create">Create Movie</Link></li>
        <li><Link to="/admin/update">Update Movie</Link></li>
        <li><Link to="/admin/reviews">Reviews</Link></li>
      </ul>
    </div>
  );
}
