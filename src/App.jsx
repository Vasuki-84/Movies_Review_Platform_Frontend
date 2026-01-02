import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AddReviews from "./Pages/AddReviews";
import MovieDetails from "./Pages/MovieDetails";
import Footer from "./Components/Footer";
import AdminRegister from "./Pages/AdminRegister";
import AdminLogin from "./Pages/AdminLogin";
import UserRegister from "./Pages/UserRegister";
import UserLogin from "./Pages/UserLogin";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<AddReviews />} />
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userLogin" element={<UserLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
