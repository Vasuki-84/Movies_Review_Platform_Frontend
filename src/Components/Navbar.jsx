import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("name");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleUserButton = () => {
    if (role === "admin") {
      navigate("/admin/layout");
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 fixed">
      <div className="flex items-center justify-between px-6 md:px-12 py-4 bg-black/40 backdrop-blur-md text-white">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-red-600">CINE</span>BUZZ
        </h1>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <li>
            <Link to="/" className="text-red-500">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/movies" className="hover:text-red-500">
              MOVIES
            </Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">TV SERIES</li>
         
        </ul>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="hidden md:block bg-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
          >
            LOG IN
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && role === "admin" && (
              <button
                onClick={handleUserButton}
                className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
              >
                {username || "Admin"}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
            >
              LOGOUT
            </button>
          </div>
        )}

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/90 text-white px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block">
            HOME
          </Link>
          <Link to="/movies" onClick={() => setIsOpen(false)} className="block">
            MOVIES
          </Link>
          <span className="block">TV SERIES</span>
          <span className="block">SEARCH</span>

          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-red-600 text-center py-2 rounded-md font-semibold"
            >
              LOG IN
            </Link>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  handleUserButton();
                  setIsOpen(false);
                }}
                className="block w-full bg-blue-600 py-2 rounded-md font-semibold"
              >
                {username || (role === "admin" ? "Admin" : "User")}
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full bg-red-600 py-2 rounded-md font-semibold"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
