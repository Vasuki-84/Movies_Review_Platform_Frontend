import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AddReviews from "./Pages/AddReviews";
import MovieDetails from "./Pages/MovieDetails";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
