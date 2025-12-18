"use client";

import { useEffect, useState } from "react";

export default function TopDestinationsSection() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("http://localhost:5000/api/destinations", {
          credentials: "include", 
        });

        const data = await res.json();

        
        if (Array.isArray(data)) {
          setDestinations(data.slice(0, 4));
        } else if (Array.isArray(data.data)) {
          
          setDestinations(data.data.slice(0, 4));
        } else {
          console.error("Unexpected API response:", data);
          setDestinations([]);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    }

    fetchDestinations();
  }, []);

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-yellow-500 font-semibold uppercase mb-2 tracking-wide playfair text-[1.1rem]">
          Top Destinations
        </h3>

        <h2 className="playfair text-4xl font-bold text-[#17233E] mb-4 leading-[1.4]">
          Explore <span className="text-teal-500">Top Destinations</span>
        </h2>

        <p className="playfair text-gray-500 mb-12 max-w-2xl mx-auto text-[1.1rem] leading-[1.6]">
          Explore our most popular destinations around the world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {destinations.map((dest, index) => (
            <div
              key={dest._id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2
                ${index === 0 ? "lg:col-span-2 h-[300px]" : ""}
                ${index === 1 ? "lg:row-span-2 h-[620px]" : ""}
              `}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>

              <div className="absolute bottom-5 left-5 text-left text-white">
                <p className="playfair text-yellow-400 italic font-semibold text-[1rem]">
                  {dest.name?.split(",")[1]?.trim() || ""}
                </p>
                <h3 className="playfair text-[1.75rem] font-[700] capitalize mb-2">
                  {dest.name?.split(",")[0]}
                </h3>
              </div>

              <div className="absolute bottom-5 right-5 bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {dest.tours?.length || 0} Tours
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
