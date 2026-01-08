import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { baseUrl } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/user/login`, form);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      toast.success(" Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/layout");
        } else {
          navigate("/review/:id");
        }
      }, 2000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("❌ Login failed! Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-8">LOG IN</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
              />
            </div>

            <div className="mb-6 relative">
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

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-2 rounded"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            New User?{" "}
            <Link to="/register" className="text-teal-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4')",
        }}
      />
    </div>
  );
}

export default Login;
