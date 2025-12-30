"use client";

import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { Link } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function BestTourPackages() {
  const [destinations, setDestinations] = useState([]);

useEffect(() => {
  async function fetchDestinations() {
    try {
      const res = await fetch("/api/destinations", {
        credentials: "include", 
      });

      const data = await res.json();

     
      if (Array.isArray(data)) {
        setDestinations(data.slice(0, 6));
      } else if (Array.isArray(data.data)) {
        setDestinations(data.data.slice(0, 6));
      } else {
        console.error("Unexpected API response:", data);
        setDestinations([]);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  }

  fetchDestinations();
}, []);


  return (
    <section className="py-15 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h3
          className={`${playfair.className} text-yellow-500 font-semibold uppercase mb-2`}
        >
          Top Pick
        </h3>
        <h2

        
          className={`${playfair.className} text-4xl font-bold text-[#17233E] mb-4`}
        >
          Best <span className="text-teal-500">Tour Packages</span>
        </h2>
        <p
          className={`${playfair.className} text-gray-500 mb-12 max-w-2xl mx-auto`}
        >
         Find the Perfect Tour for Your Next Adventure
        Easy-to-book trips, amazing places, and memories you’ll never forget.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path d="M10 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H10ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V12ZM11.25 10.005c0-.417.338-.755.755-.755h2a.755.755 0 1 1 0 1.51h-2a.755.755 0 0 1-.755-.755ZM6.005 11.25a.755.755 0 1 0 0 1.51h4a.755.755 0 1 0 0-1.51h-4Z" />
  <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
</svg>
{dest.tours?.length || 0} Tours
                </div>
              </div>

              
              <div className="p-5 text-left">
                <p
                  className={`${playfair.className} text-teal-600 font-semibold`}
                >
                  {dest.name.split(",")[1] || "—"}
                </p>
                <h3
                  className={`${playfair.className} text-xl font-bold text-[#17233E] mb-2`}
                >
                  {dest.name.split(",")[0]}
                </h3>

                
                <p className="text-gray-500 text-sm mb-3">
                  {dest.description?.slice(0, 80)}...
                </p>

                
                {dest.tours?.length > 0 && (
                  <p className="text-teal-600 font-bold">
                    $
                    {Math.min(
                      ...dest.tours.map((t) => Number(t.price || 0))
                    ).toFixed(2)}{" "}
                    <span className="text-gray-400 font-normal">| Per person</span>
                  </p>
                )}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
