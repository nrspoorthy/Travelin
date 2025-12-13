"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Destinations() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelType, setTravelType] = useState("");
  const [duration, setDuration] = useState("");


 const handleSearch = () => {

  if (!destination || !date || !travelType || !duration) {
    alert("Please select destination, date, travel type and duration");
    return;
  }

  const params = new URLSearchParams();

  params.append("destination", destination);
  params.append("date", date);
  params.append("type", travelType);
  params.append("duration", duration);

  router.push(`/destinations?${params.toString()}`);
};


  return (
    <section className="flex justify-center items-center w-full py-1">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl w-full">

        <div className="bg-teal-600 text-white flex flex-col justify-center items-center px-8 py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-center leading-tight">
            Find Your <br /> Holidays
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between w-full px-6 py-4 gap-4 bg-white">

          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-[180px]"
          >
            <option value="">Destination</option>
            <option value="paris">Paris</option>
            <option value="bali">Bali</option>
            <option value="tokyo">Tokyo</option>
            <option value="dubai">Dubai</option>
            <option value="newyork">New York</option>
            <option value="santorini">Santorini</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-[180px]"
          />

          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-[180px]"
          >
            <option value="">Travel Type</option>
            <option value="adventure">Adventure</option>
            <option value="romantic">Romantic</option>
            <option value="family">Family</option>
            <option value="luxury">Luxury</option>
          </select>

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-[180px]"
          >
            <option value="">Tour Duration</option>
            <option value="1-3">1–3 Days</option>
            <option value="4-7">4–7 Days</option>
            <option value="8-10">8–10 Days</option>
            <option value="10+">10+ Days</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2"
          >
            Search Now
          </button>
        </div>
      </div>
    </section>
  );
}
