import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import AddReviews from "./Pages/AddReviews";
import MovieDetails from "./Pages/MovieDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

// Admin pages & layout
import AdminLayout from "./Pages/admin/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import CreateMovie from "./Pages/admin/CreateMovie";
import UpdateMovie from "./Pages/admin/UpdateMovie";
import Reviews from "./Pages/admin/Reviews";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<AddReviews />} />
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES  */}
        <Route path="/admin/layout" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />          
          <Route path="create" element={<CreateMovie />} /> 
          <Route path="update" element={<UpdateMovie />} />
          <Route path="reviews" element={<Reviews />} />    
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
