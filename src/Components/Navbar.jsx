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

        <ul className="hidden md:flex items-center gap-8 text-sm font-bold">
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/" className="text-red-500">
              Home
            </Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/hollywood" className="hover:text-red-500">
              Hollywood
            </Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/kollywood" className="hover:text-red-500">
              Kollywood
            </Link>
          </li>
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
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-black/95 text-white z-50">
          <div className="flex flex-col items-center space-y-5 py-6 px-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold hover:text-red-500"
            >
              HOME
            </Link>

            <Link
              to="/hollywood"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold hover:text-red-500"
            >
              Hollywood
            </Link>

            <Link
              to="/kollywood"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold hover:text-red-500"
            >
              Kollywood
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-xs text-center bg-red-600 py-3 rounded-lg font-semibold"
              >
                LOG IN
              </Link>
            ) : (
              <div className="w-full max-w-xs space-y-3">
                <button
                  onClick={() => {
                    handleUserButton();
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 py-3 rounded-lg font-semibold"
                >
                  {username || (role === "admin" ? "Admin" : "User")}
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 py-3 rounded-lg font-semibold"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
