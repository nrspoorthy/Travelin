"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import ErrorFallback from "@/components/ErrorFallback";



const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
export default function ToursListingPage() {
  const [tours, setTours] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours", {
        credentials: "include", 
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        throw new Error("FAILED");
      }

      const data = await res.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTours();
}, []);
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen text-gray-600">
      Loading tours...
    </div>
  );
}
if (error) {
  return (
    <ErrorFallback
      title="Oops! Page Not Found"
      heading={
        error === "UNAUTHORIZED"
          ? "Please Login To View Tours"
          : "Something Went Wrong"
      }
      description={
        error === "UNAUTHORIZED"
          ? "You must be logged in to explore tours."
          : "We couldn’t load tours right now."
      }
      showHomeButton
    />
  );
}


  return (
    <>
    <Navbar/>
     <section
        className="relative bg-cover bg-center h-[400px] md:h-[180px] flex flex-col justify-center"
        style={{
          backgroundImage:
            "url('https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-[#012C3D]/85 mix-blend-multiply"></div>

        
        

        
        <div className="relative z-20 text-center text-white max-w-3xl mx-auto px-4">
          <h1
            className={`text-4xl md:text-2xl font-bold mb-4 drop-shadow-xl ${playfair.className}`}
          >
            TOURS LIST
          </h1>
          <p className="text-gray-200 text-lg">
            <Link
              href="/"
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Home
            </Link>{" "}
            <span className="text-yellow-400 font-bold">|</span>{" "}
            <span className="text-white/90">Tours List</span>
          </p>
        </div>
      </section>
    <section className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
          <h3
            className={`text-yellow-600 font-semibold text-lg mb-2 uppercase tracking-wide ${playfair.className}`}
          >
            TOP TOURS
          </h3>

          <h2
            className={`text-4xl md:text-5xl font-bold text-teal-700 mb-4 ${playfair.className}`}
          >
            Explore <span className="text-yellow-500">Top Tours</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover the world’s most breathtaking destinations curated for
            every traveler.
          </p>
        </div>

      
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative w-full h-56">
              <Image
                src={tour.images?.[0] || "/placeholder.jpg"}
                alt={tour.tourName}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {tour.tourName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {tour.city}, {tour.country}
                  </p>
                </div>
                <span className="text-teal-600 font-bold text-lg">
                  ${tour.price}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {tour.shortDescription}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">
                  {tour.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({tour.totalReviews} reviews)
                </span>
              </div>

              {/* Duration */}
              <div className="text-sm text-gray-500">
                Duration: {tour.duration}
              </div>

              {/* Button */}
              <Link
                href={`/tours/${tour._id}`}
                className="block text-center bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  );
}
