import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">🎬 CineRate</h1>

        <ul className="hidden md:flex space-x-6">
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

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" className="hover:text-red-400">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-red-500 text-black px-3 py-1 rounded"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/movies" onClick={() => setIsOpen(false)}>
              Movies
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block bg-yellow-400 text-black px-3 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block bg-red-500 text-black px-3 py-1 rounded"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
