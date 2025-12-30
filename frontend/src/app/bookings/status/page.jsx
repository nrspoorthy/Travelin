"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";


const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings/status")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading booking status...
      </div>
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
            BOOKING LIST
          </h1>
          <p className="text-gray-200 text-lg">
            <Link
              href="/"
              className="hover:text-yellow-400 transition duration-300 font-medium"
            >
              Home
            </Link>{" "}
            <span className="text-yellow-400 font-bold">|</span>{" "}
            <span className="text-white/90">Bookings List</span>
          </p>
        </div>
      </section>
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Booking Status
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >
             
              <h2 className="font-semibold text-lg mb-2">
                {booking.userName ||
                  `${booking.firstName || ""} ${booking.lastName || ""}`}
              </h2>

             
              <p>
                <span className="font-medium">Type:</span>{" "}
                {booking.bookingType}
              </p>

             
              {booking.bookingType === "Destination" && (
                <>
                  <p>
                    <span className="font-medium">Destination:</span>{" "}
                    {booking.destinationName}
                  </p>
                  <p>
                    <span className="font-medium">Tour:</span>{" "}
                    {booking.tourName}
                  </p>
                </>
              )}

             
              <p>
                <span className="font-medium">Email:</span>{" "}
                {booking.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {booking.phone}
              </p>

            
              {booking.amountINR && (
                <p className="mt-2 font-semibold">
                  Amount Paid: ₹{booking.amountINR}
                </p>
              )}

             
              <div className="mt-3">
                <span className="font-medium">Status: </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.bookingStatus === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.bookingStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </div>

            
              <p className="text-xs text-gray-400 mt-2">
                Booking ID: {booking._id}
              </p>
              <p className="text-xs text-gray-400">
                Date: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
