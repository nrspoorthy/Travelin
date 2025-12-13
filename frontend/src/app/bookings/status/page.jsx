"use client";
import { useEffect, useState } from "react";

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/status")
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || data); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading booking status...</div>;
  }

  return (
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
                {booking.name}
              </h2>

              <p><span className="font-medium">Type:</span> {booking.bookingType}</p>
              <p><span className="font-medium">Email:</span> {booking.email}</p>
              <p><span className="font-medium">Phone:</span> {booking.phone}</p>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
