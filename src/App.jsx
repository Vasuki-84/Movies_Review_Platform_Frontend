import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// lazy loading 
const Home = lazy(() => import("./pages/Home"));
const Kollywood = lazy(() => import("./pages/Kollywood"));
const Hollywood = lazy(() => import("./pages/Hollywood"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Reviews = lazy(() => import("./Pages/Reviews"));




// Admin pages & layout
import AdminLayout from "./Pages/admin/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import CreateMovie from "./Pages/admin/CreateMovie";
import UpdateMovie from "./Pages/admin/UpdateMovie";
import UpdateMovieForm from "./Pages/admin/UpdateMovieForm";
import AdminReviews from "./Pages/admin/AdminReviews";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div>
      <Navbar />
  <Suspense fallback={<p>Loading...</p>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/kollywood" element={<Kollywood />} />
    <Route path="/hollywood" element={<Hollywood />} />

    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/review/:id" element={<Reviews />} />

    <Route path="/admin/layout" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<CreateMovie />} />
      <Route path="update" element={<UpdateMovie />} />
      <Route path="reviews" element={<AdminReviews />} />
      <Route path="update/:id" element={<UpdateMovieForm />} />
    </Route>
  </Routes>
</Suspense>

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
