/* eslint-disable no-unused-vars */
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-slate-400">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
