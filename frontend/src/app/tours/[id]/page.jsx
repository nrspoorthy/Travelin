"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function TourDetailsPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  const descriptionRef = useRef(null);
  const includesRef = useRef(null);
  const itineraryRef = useRef(null);
  const reviewsRef = useRef(null);

  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/tours/tour/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch(console.error);
  }, [id]);

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  const scrollTo = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const basePrice = tour.price || 0;
  const displayPrice = currency === "USD" ? basePrice : Math.round(basePrice * 83);
  const symbol = currency === "USD" ? "$" : "₹";

  return (
    <>
      <Navbar />

      <div className={`max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8 ${playfair.className}`}>
        {/* LEFT CONTENT */}
        <div className="lg:col-span-3 space-y-8">
          {/* TITLE SECTION */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {tour.tourName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <MapPin className="w-4 h-4" /> {tour.city}, {tour.country}
              <span className="flex items-center gap-1 ml-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {tour.rating}
                <span className="text-xs text-gray-400">({tour.totalReviews} reviews)</span>
              </span>
            </div>
          </div>

          {/* MAIN IMAGE FULL WIDTH */}
          <div className="w-full rounded-2xl overflow-hidden bg-gray-100">
            <div className="relative w-full h-[500px]">
              <Image
                src={tour.images[0]}
                alt={tour.tourName}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div ref={descriptionRef}>
            <h2 className="font-semibold text-xl mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{tour.overview}</p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold block">Duration</span>
              <span className="text-gray-700">{tour.duration}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold block">Group Size</span>
              <span className="text-gray-700">{tour.tourDetails?.groupSize}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold block">Pickup</span>
              <span className="text-gray-700">{tour.tourDetails?.pickup}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold block">Language</span>
              <span className="text-gray-700">{tour.tourDetails?.language}</span>
            </div>
          </div>

          {/* PRICE BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={includesRef}>
            <div className="bg-gray-100 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Price Includes</h3>
              <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                {tour.priceIncludes?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Price Excludes</h3>
              <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                {tour.priceExcludes?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ITINERARY */}
          <div ref={itineraryRef}>
            <h2 className="font-semibold text-xl mb-4">Tour Plan</h2>
            {tour.itinerary?.map((item, idx) => (
              <details key={idx} className="mb-3 bg-white rounded-lg shadow-sm p-4">
                <summary className="cursor-pointer font-medium">
                  {item.day} - {item.title}
                </summary>
                <p className="text-gray-700 mt-2 text-sm">{item.description}</p>
              </details>
            ))}
          </div>

          

          {/* REVIEWS */}
          <div ref={reviewsRef}>
            <h2 className="font-semibold text-xl mb-4">Reviews</h2>
            <div className="space-y-4">
              {tour.reviews?.map((review, i) => (
                <div key={i} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <strong>{review.user}</strong>
                    <span>⭐ {review.rating}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
            <div className="bg-teal-600 text-white py-3 px-4 font-semibold">
              Highlight
            </div>
            <button onClick={() => scrollTo(descriptionRef)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Summary</button>
            <button onClick={() => scrollTo(includesRef)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Includes / Excludes</button>
            <button onClick={() => scrollTo(itineraryRef)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Itinerary</button>
            <button onClick={() => scrollTo(reviewsRef)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Reviews</button>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md sticky top-[260px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-teal-600">
                  {symbol}{displayPrice}
                </div>
                <p className="text-sm text-gray-500">{tour.priceType}</p>
              </div>

              <div className="text-sm">
                <label className="block text-gray-500 mb-1">Currency</label>
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>

           <Link
                          href={`/bookings/tours?tourId=${tour._id}`}
                          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg"
                        >
                          Book Now
                        </Link>


          </div>
        </div>
        {/* ADD REVIEW FORM */}
<div className="mt-6">
  <h2 className="font-semibold text-lg mb-3">Write a Review</h2>

  <form
    onSubmit={async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const reviewData = {
        user: formData.get("name"),
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
      };

      const res = await fetch(`http://localhost:5000/api/tours/tour/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const updated = await res.json();
      if (updated.reviews) {
        setTour({ ...tour, reviews: updated.reviews });
      }

      e.target.reset();
    }}
    className="space-y-3"
  >
    <input
      name="name"
      placeholder="Your Name"
      required
      className="w-full border p-2 rounded"
    />

    <select name="rating" required className="w-full border p-2 rounded">
      <option value="">Select Rating</option>
      <option value="5">5 - Excellent</option>
      <option value="4">4 - Good</option>
      <option value="3">3 - Average</option>
      <option value="2">2 - Poor</option>
      <option value="1">1 - Bad</option>
    </select>

    <textarea
      name="comment"
      placeholder="Write your experience..."
      required
      className="w-full border p-2 rounded"
      rows="4"
    ></textarea>

    <button
      type="submit"
      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
    >
      Submit Review
    </button>
  </form>
</div>

      </div>
      

      <Footer />
    </>
  );
}