"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { MapPin, Wallet, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function AboutSection() {
  return (
    <>
      <Navbar />

      {/* HERO HEADER */}
      <section
        className="relative bg-cover bg-center h-[400px] md:h-[220px] flex flex-col justify-center"
        style={{
          backgroundImage:
            "url('https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#012C3D]/85 mix-blend-multiply"></div>

        <div className="relative z-20 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className={`text-4xl font-bold mb-4 ${playfair.className}`}>
            ABOUT US
          </h1>
          <p className="text-gray-200 text-lg">
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>{" "}
            <span className="text-yellow-400 font-bold">|</span>{" "}
            <span>About Us</span>
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT SECTION */}
      <section className="relative bg-white pt-32 pb-20 overflow-hidden">

        

        <div className="relative z-20 max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className={playfair.className}>
            <h5 className="text-teal-600 font-semibold mb-3">Get To Know Us</h5>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Explore All Tour Of The <br />
              World With Us.
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Our Tours & Travel project is built to help explorers discover the
              most breathtaking destinations across the globe with ease and
              confidence. From rare adventures to luxury getaways, we provide
              carefully curated tour packages designed for unforgettable
              experiences.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              With our platform, users can browse tours, view detailed itineraries,
              compare prices, submit reviews, and book trips seamlessly — all in
              one modern and user-friendly system.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="text-teal-600" />
                <span>Expert Tour Guides</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Wallet className="text-teal-600" />
                <span>Affordable Packages</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck className="text-teal-600" />
                <span>Trusted & Secure Booking</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute w-[420px] h-[420px] bg-yellow-400 rounded-full -z-10"></div>

            <Image
              src="https://htmldesigntemplates.com/html/travelin/images/travel.png"
              alt="Travelers"
              width={500}
              height={500}
              className="relative object-contain"
            />

            {/* FLOATING ICONS */}
            <div className="absolute top-10 right-6 bg-teal-600 p-4 rounded-full text-white shadow-lg">
              <MapPin />
            </div>

            <div className="absolute bottom-6 right-20 bg-yellow-500 p-4 rounded-full text-white shadow-lg">
              <Wallet />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
