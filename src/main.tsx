import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.tsx";
import { AnimatePresence } from "framer-motion";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AnimatePresence mode="wait">
        <div className="w-screen min-h-screen flex justify-center bg-[#004696] relative">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
