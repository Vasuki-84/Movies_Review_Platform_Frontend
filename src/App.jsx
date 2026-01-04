import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AddReviews from "./Pages/AddReviews";
import MovieDetails from "./Pages/MovieDetails";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/admin/Dashboard";
import CreateMovie from "./Pages/admin/CreateMovie";
import UpdateMovie from "./Pages/admin/UpdateMovie";
import Reviews from "./Pages/admin/Reviews";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<AddReviews />} />
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/create" element={<CreateMovie />} />
        <Route path="/admin/update" element={<UpdateMovie />} />
        <Route path="/admin/reviews" element={<Reviews />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
