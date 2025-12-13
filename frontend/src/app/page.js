"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Destinations from "@/components/Destinations";
import CoreFeaturesSection from "@/components/CoreFeaturesSection";
import TopDestinationsSection from "@/components/TopDestinationsSection";
import BestTourPackages from "@/components/BestTourPackages";
import Footer from "@/components/Footer";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(null);

  return (
    <div>
      {/* Navbar notifies login status */}
      <Navbar onLoginCheck={(status) => setLoggedIn(status)} />

      {/* Always visible */}
      <Slider />

      {/* 🔥 Render below components ONLY after login */}
      {loggedIn && (
        <>
          <Destinations />
          <CoreFeaturesSection />
          <TopDestinationsSection />
          <BestTourPackages />
        </>
      )}

      {/* Optional: Show footer always */}
      <Footer />
    </div>
  );
}
