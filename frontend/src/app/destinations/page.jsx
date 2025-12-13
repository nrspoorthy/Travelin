"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const destinationParam = searchParams.get("destination");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/destinations");
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data = await res.json();
        setDestinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);


  const finalDestinations = destinationParam
    ? destinations.filter((place) =>
        place.name
          .toLowerCase()
          .includes(destinationParam.toLowerCase())
      )
    : destinations;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading destinations...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );

  return (
    <>
      <Navbar />

      
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
            DESTINATION LIST
          </h1>
          <p className="text-gray-200 text-lg">
            <Link
              href="/"
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Home
            </Link>{" "}
            <span className="text-yellow-400 font-bold">|</span>{" "}
            <span className="text-white/90">Destination List</span>
          </p>
        </div>
      </section>

      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3
            className={`text-yellow-600 font-semibold text-lg mb-2 uppercase tracking-wide ${playfair.className}`}
          >
            Top Destinations
          </h3>
          <h2
            className={`text-4xl md:text-5xl font-bold text-teal-700 mb-4 ${playfair.className}`}
          >
            Explore <span className="text-yellow-500">Top Destinations</span>
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Discover the world’s most breathtaking destinations curated for
            every traveler.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {finalDestinations.map((place) => (
              <div
                key={place._id}
                className="relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={place.image}
                  alt={place.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 p-5 text-left text-white">
                  <p className="text-yellow-400 text-sm font-medium mb-1">
                    {place.country || "Explore"}
                  </p>
                  <h3
                    className={`text-2xl font-bold mb-2 ${playfair.className}`}
                  >
                    {place.name}
                  </h3>
                  <Link
                    href={`/destinations/${place._id}`}
                    className="text-sm text-teal-300 hover:underline relative z-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {finalDestinations.length === 0 && (
            <p className="text-gray-500 mt-10">
              No destinations found
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
