"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaStar } from "react-icons/fa";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

function DestinationBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const destinationId = searchParams.get("destinationId");

  const [destination, setDestination] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address1: "",
    address2: "",
  });

  useEffect(() => {
    if (!destinationId) return;

    fetch(`http://localhost:5000/api/destinations/${destinationId}`)
      .then((res) => res.json())
      .then((data) => setDestination(data))
      .catch(console.error);
  }, [destinationId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBooking = async () => {
    const res = await fetch("http://localhost:5000/api/bookings/destination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        destinationId,
        status: "Booked",
      }),
    });

    if (res.ok) setStatusMsg("Booking Successful! Destination Reserved");
  };

  const basePrice = destination?.price || 0;
  const tax = Math.round(basePrice * 0.1);
  const total = basePrice + tax;

  return (
    <>
      <Navbar />

      <section
        className="relative bg-cover bg-center h-[180px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#012C3D]/85"></div>
        <div className="relative text-center text-white">
          <h1 className={`${playfair.className} text-4xl font-bold`}>
            DESTINATION BOOKING
          </h1>
          <p className="text-gray-200">
            <Link href="/">Home</Link> | Booking
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT FORM */}
        <div className="lg:col-span-2 bg-white p-10 rounded-2xl shadow">
          <h2 className={`${playfair.className} text-2xl font-bold mb-2`}>
            Traveller Information
          </h2>
          <p className="text-gray-600 mb-8">Let Us Know Who You Are</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select name="title" className="input" onChange={handleChange}>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
            </select>
            <input name="firstName" className="input" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" className="input" placeholder="Last Name" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <input name="email" className="input" placeholder="Email" onChange={handleChange} />
            <input name="phone" className="input" placeholder="Phone" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <input name="country" className="input" placeholder="Country" onChange={handleChange} />
            <input name="city" className="input" placeholder="City" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <input name="address1" className="input" placeholder="Address Line 1" onChange={handleChange} />
            <input name="address2" className="input" placeholder="Address Line 2" onChange={handleChange} />
          </div>

          <button
            onClick={handleBooking}
            className="mt-8 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
          >
            Confirm Booking
          </button>

          {statusMsg && <p className="mt-4 text-green-700">{statusMsg}</p>}
        </div>

        {/* RIGHT SIDEBAR */}
        {destination && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <Image src={destination.image} alt={destination.name} width={120} height={120} />
            <h3 className="font-bold text-lg">{destination.name}</h3>
            <p>{destination.country}</p>
            <p>Total: ₹{total}</p>
            {statusMsg && (
              <button
                onClick={() => router.push("/bookings/status")}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                View Booking Status
              </button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default function DestinationBookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <DestinationBookingContent />
    </Suspense>
  );
}
