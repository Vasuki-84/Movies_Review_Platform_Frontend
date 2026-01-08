import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Reviews from "./Pages/Reviews";

// Admin pages & layout
import AdminLayout from "./Pages/admin/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import CreateMovie from "./Pages/admin/CreateMovie";
import UpdateMovie from "./Pages/admin/UpdateMovie";
import UpdateMovieForm from "./Pages/admin/UpdateMovieForm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review/:id" element={<Reviews />} />

        {/* ADMIN ROUTES  */}
        <Route path="/admin/layout" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateMovie />} />
          <Route path="update" element={<UpdateMovie />} />

          <Route
            path="/admin/layout/update/:id"
            element={<UpdateMovieForm />}
          />
        </Route>
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}

export default App;
