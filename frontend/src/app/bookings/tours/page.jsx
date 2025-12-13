"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaStar } from "react-icons/fa";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function DestinationBookingPage() {
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

  // Fetch destination details
  useEffect(() => {
    if (!destinationId) return;

    fetch(`http://localhost:5000/api/destinations/${destinationId}`)
      .then((res) => res.json())
      .then((data) => setDestination(data))
      .catch((err) => console.error(err));
  }, [destinationId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const payload = {
      ...formData,
      destinationId,
      status: "Booked",
    };

    const res = await fetch("http://localhost:5000/api/bookings/destination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatusMsg(" Booking Successful! Destination Reserved");
    }
  };

  // Price calculations
  const basePrice = destination?.price || 0;
  const tax = Math.round(basePrice * 0.1);
  const total = basePrice + tax;

  return (
    <>
      <Navbar />

      {/* Banner */}
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
            TOUR BOOKING
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
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Title</label>
              <select name="title" className="input" onChange={handleChange}>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
              </select>
            </div>

            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>First Name</label>
              <input name="firstName" className="input" onChange={handleChange} />
            </div>

            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Last Name</label>
              <input name="lastName" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Email</label>
              <input name="email" className="input" onChange={handleChange} />
            </div>
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Phone</label>
              <input name="phone" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Country</label>
              <input name="country" className="input" onChange={handleChange} />
            </div>
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>City</label>
              <input name="city" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Address Line 1</label>
              <input name="address1" className="input bg-blue-50" onChange={handleChange} />
            </div>
            <div>
              <label className={`${playfair.className} text-sm mb-1 block`}>Address Line 2</label>
              <input name="address2" className="input bg-blue-50" onChange={handleChange} />
            </div>
          </div>

          {/* Booking Action */}
          <div className="mt-10 bg-teal-50 p-6 rounded-xl border border-teal-200">
            <h3 className={`${playfair.className} text-lg font-semibold mb-2`}>
              Booking Confirmation
            </h3>
            <p className="text-gray-600">
              Online payments are disabled. Click confirm to reserve this destination.
            </p>

            <button
              onClick={handleBooking}
              className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Confirm Booking
            </button>

            {statusMsg && (
              <div className="mt-4 text-green-700 font-semibold">
                {statusMsg}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Booking Details */}
          {destination && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className={`${playfair.className} text-xl font-bold mb-4`}>
                Your Booking Details
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={90}
                  height={90}
                  className="rounded-lg object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">200 Reviews</span>
                  </div>
                  <h4 className="font-semibold text-lg">{destination.name}</h4>
                  <p className="text-teal-600 text-sm">{destination.country}</p>
                </div>
              </div>

              <div className="border-t pt-4 text-sm space-y-2">
                <p className="text-gray-500">Total Length Of Stay:</p>
                <p className="font-medium">3 Days | 2 Nights</p>
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className={`${playfair.className} text-xl font-bold mb-4`}>
              Your Price Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Package</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Fee</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white p-3 rounded-lg flex justify-between font-bold">
              <span>Amount</span>
              <span>₹{total}</span>
            </div>
          </div>

          {statusMsg && (
            <button
              onClick={() => router.push("/bookings/status")}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              View Booking Status
            </button>
          )}

        </div>
      </div>

      <Footer />

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }
        .input:focus {
          border-color: #0f766e;
        }
      `}</style>
    </>
  );
}
