import React from "react";
import { Routes, Route } from "react-router-dom";
import ArtistHero from "./ArtistHero";
import ArtistAbout from "./ArtistAbout"; // Our new about page component
import WorksSection from "./WorksSection";
import Navbar from "./Navbar";

export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<ArtistHero />} />
        <Route path="/about" element={<ArtistAbout />} />
        <Route path="/works" element={<WorksSection />} />
      </Routes>
    </main>
  );
}
