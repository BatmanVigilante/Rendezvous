import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import VideoMeet from "./pages/videoMeet"; // Updated import

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/:url" element={<VideoMeet />} />
        <Route path="/home" element={<div>Home Page</div>} />{" "}
        {/* Placeholder */}
      </Routes>
    </Router>
  );
}
