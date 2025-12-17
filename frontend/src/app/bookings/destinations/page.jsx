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

function DestinationBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const destinationId = searchParams.get("destinationId");
  const tourId = searchParams.get("tourId");

  const [destination, setDestination] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

const selectedTour = destination?.tours?.length
  ? tourId
    ? destination.tours.find(
        (tour) => String(tour.id) === String(tourId)
      )
    : destination.tours[0]
  : null;


  const USD_TO_INR = 83;
  const basePriceUSD = selectedTour?.price || 0;
  const basePriceINR = Math.round(basePriceUSD * USD_TO_INR);
  const tax = Math.round(basePriceINR * 0.1);
  const total = basePriceINR + tax;


const handleBooking = async () => {
  console.log(" Booking button clicked");
  console.log("destinationId:", destinationId);
  console.log("selectedTour:", selectedTour);

  try {
    const res = await fetch("http://localhost:5000/api/bookings/destination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,

        destinationId,              
        tourId: selectedTour.id,    

        amountUSD: basePriceUSD,
        amountINR: total,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    setStatusMsg("Booking Successful! Redirecting...");
    setTimeout(() => {
      router.push("/bookings/status");
    }, 1500);
  } catch (err) {
    console.error(err);
    setErrorMsg(err.message);
  }
};



  return (
    <div className="bg-gray-50">
      <Navbar />

      
      <section
        className="relative bg-cover bg-center h-[180px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#012C3D]/85"></div>
        <div className={`${playfair.className} relative text-center text-white`}>
          <h1 className="text-4xl font-bold">DESTINATION BOOKING</h1>
          <p className="text-gray-200 mt-2">
            <Link href="/">Home</Link> | Booking
          </p>
        </div>
      </section>

     
      <div className="max-w-screen-xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

       
        <div className="lg:col-span-2 bg-white p-12 rounded-3xl shadow">
          <h2 className={`${playfair.className} text-3xl font-bold mb-2`}>
            Traveller Information
          </h2>
          <p className="text-gray-500 mb-10">Let Us Know Who You Are</p>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="label">Title</label>
              <select name="title" className="input" onChange={handleChange}>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
              </select>
            </div>

            <div>
              <label className="label">First Name</label>
              <input
                name="firstName"
                className="input"
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Last Name</label>
              <input
                name="lastName"
                className="input"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="label">Email</label>
              <input
                name="email"
                className="input"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Phone</label>
              <input
                name="phone"
                className="input"
                placeholder="Phone No."
                onChange={handleChange}
              />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="label">Gender</label>
              <select className="input">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="label">DOB</label>
              <input type="date" className="input" />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="label">Select Country</label>
              <input
                name="country"
                className="input"
                placeholder="Country"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Select City</label>
              <input
                name="city"
                className="input"
                placeholder="City"
                onChange={handleChange}
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <label className="label">Address Line 1</label>
              <input
                name="address1"
                className="input"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Address Line 2</label>
              <input
                name="address2"
                className="input"
                onChange={handleChange}
              />
            </div>
          </div>

        
          <button
            onClick={handleBooking}
            className="mt-10 bg-teal-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700"
          >
            Confirm Booking
          </button>

          {statusMsg && (
            <p className="mt-4 text-green-600 font-semibold">{statusMsg}</p>
          )}
          {errorMsg && (
            <p className="mt-4 text-red-600 font-semibold">{errorMsg}</p>
          )}
        </div>


        {destination && selectedTour && (
          <div className="bg-white p-8 rounded-3xl shadow h-fit">
            <Image
              src={destination.image}
              alt={destination.name}
              width={260}
              height={160}
              className="rounded-2xl object-cover mb-6"
            />

            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-gray-500 text-sm ml-2">200 Reviews</span>
            </div>

            <h3 className={`${playfair.className} text-2xl font-bold`}>
              {destination.name}
            </h3>

            <div className="flex justify-between mb-2">
              <span>Base Price</span>
              <span>₹{basePriceINR}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        )}
      </div>

      <Footer />

     
      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #fff;
          font-size: 0.95rem;
          outline: none;
        }
        .input:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.25);
        }
      `}</style>
    </div>
  );
}

export default function DestinationBookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <DestinationBookingContent />
    </Suspense>
  );
}
