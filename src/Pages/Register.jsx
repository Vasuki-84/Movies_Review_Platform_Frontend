import React, { useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/user/register`, form);

      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white p-5">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-8">SIGN UP</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
              />
            </div>

            <div className="mb-5 relative">
              <label className="block text-sm mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
              >
                <option value="" disabled>
                  Choose role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-2 rounded"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
        }}
      />
    </div>
  );
}

export default Register;
