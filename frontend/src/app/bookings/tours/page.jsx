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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* ================= INNER CONTENT ================= */
function TourBookingContent() {
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

    if (res.ok) {
      setStatusMsg("Booking Successful! Tour Reserved");
    }
  };

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
          <h2 className={`${playfair.className} text-2xl font-bold mb-4`}>
            Traveller Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="firstName"
              placeholder="First Name"
              className="input"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className="input"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="input"
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              className="input"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
          >
            Confirm Booking
          </button>

          {statusMsg && (
            <p className="mt-4 text-green-600 font-semibold">{statusMsg}</p>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        {destination && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <Image
                src={destination.image}
                alt={destination.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <h4 className="font-semibold">{destination.name}</h4>
                <p className="text-sm text-gray-500">{destination.country}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Package</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 8px;
          width: 100%;
        }
        .input:focus {
          border-color: #0f766e;
          outline: none;
        }
      `}</style>
    </>
  );
}


export default function TourBookingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading booking…</div>}>
      <TourBookingContent />
    </Suspense>
  );
}
