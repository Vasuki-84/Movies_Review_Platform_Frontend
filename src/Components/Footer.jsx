import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-1">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white">🎬 CineRate</h2>
            <p className="mt-2 text-sm">
              Discover, review, and rate your favorite movies with CineRate.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-red-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-red-400">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/review" className="hover:text-red-400">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-red-400">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm">📧 support@cinerate.com</p>
            <p className="text-sm">📍 India</p>
          </div>
        </div>

        <div className="border-t w-full border-gray-700 mt-6 ">
          <p className="text-center text-sm py-4">
            © {new Date().getFullYear()} CineRate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
