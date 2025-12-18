"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "../components/Navbar";
import Destinations from "@/components/Destinations";
import CoreFeaturesSection from "@/components/CoreFeaturesSection";
import TopDestinationsSection from "@/components/TopDestinationsSection";
import BestTourPackages from "@/components/BestTourPackages";
import Footer from "@/components/Footer";

const Slider = dynamic(() => import("../components/Slider"), {
  ssr: false,
});

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(null);

  return (
    <div>
      <Navbar onLoginCheck={(status) => setLoggedIn(status)} />

      
      <Slider />

      {loggedIn && (
        <>
          <Destinations />
          <CoreFeaturesSection />
          <TopDestinationsSection />
          <BestTourPackages />
        </>
      )}

      <Footer />
    </div>
  );
}
