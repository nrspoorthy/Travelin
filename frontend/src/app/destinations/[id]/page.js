
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display } from "next/font/google";
import { FaStar } from "react-icons/fa";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (!id) return;

  const fetchDestination = async () => {
    try {
      const res = await fetch(
        `/api/destinations/${id}`,
        {
          credentials: "include", 
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        throw new Error("FAILED");
      }

      const data = await res.json();
      setDestination(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDestination();
}, [id]);


  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!destination) return <div className="p-8 text-center">Destination not found.</div>;

  const {
    name,
    description,
    image,
    gallery = [],
    attractions = [],
    experiences = [],
    tours = []
  } = destination;

  const avgRating =
    experiences.length > 0
      ? experiences.reduce((s, e) => s + e.rating, 0) / experiences.length
      : null;

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-12">

        {/* Back link */}
        <Link href="/destinations" className="text-teal-600 hover:underline mb-4 inline-block">
          ← Back to Destinations
        </Link>

        <div className="md:flex md:space-x-10">

          {/* MAIN CONTENT */}
          <main className="md:flex-1">

            {/* Title + Book Btn */}
            <div className="flex justify-between items-center mb-4">
              <h1 className={`text-3xl lg:text-4xl font-bold text-teal-800 ${playfair.className}`}>
                {name}
              </h1>

              <Link
                href={`/bookings/destinations?destinationId=${destination._id}`}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center text-yellow-500 mb-6">
                <FaStar />
                <span className="ml-2 font-semibold">{avgRating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({experiences.length} reviews)
                </span>
              </div>
            )}

            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-8 shadow">
              <Image
                src={image}
                alt={name}
                width={1200}
                height={600}
                className="w-full h-[360px] object-cover"
              />
            </div>

            {/* ABOUT SECTION */}
            <section id="about-section" className="mb-12">
              <h2 className={`text-2xl font-semibold mb-3 text-teal-700 ${playfair.className}`}>
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </section>

            {/* ATTRACTIONS */}
            {attractions.length > 0 && (
              <section id="attractions-section" className="mb-12">
                <h2 className={`text-2xl font-semibold mb-3 text-teal-700 ${playfair.className}`}>
                  Includes / Excludes
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {attractions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}

           
            {tours.length > 0 && (
              <section id="tours-section" className="mb-12">
                <h2 className={`text-2xl font-semibold mb-4 text-teal-700 ${playfair.className}`}>
                  Available Tours
                </h2>

                <div className="space-y-5">
                  {tours.map((tour) => (
                    <div
                      key={tour._id}
                      className="border rounded-xl p-4 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start">

                        {/* Left Info */}
                        <div>
                          <h3 className="text-xl font-semibold text-teal-700">
                            {tour.name}
                          </h3>

                          <p className="text-gray-600 mt-1">{tour.description}</p>

                          <p className="text-sm text-gray-500 mt-2">
                            Duration: <span className="font-medium">{tour.duration}</span>
                          </p>

                          <p className="text-sm text-gray-500">
                            Seats Available:{" "}
                            <span className="font-medium">{tour.availableSeats}</span>
                          </p>

                          {/* ⭐ Price */}
                          <p className="text-lg font-bold text-yellow-600 mt-2">
                            Price: ₹{tour.price}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center text-yellow-500 mt-1">
                            <FaStar />
                            <span className="ml-2 font-semibold">{tour.rating}</span>
                          </div>
                        </div>

                        {/* Book Button */}
                        <Link
                          href={`/bookings/tour?tourId=${tour._id}`}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 transition"
                        >
                          Book Tour
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCES / REVIEWS */}
            <section id="experiences-section" className="mb-12">
              <h2 className={`text-2xl font-semibold mb-5 text-teal-700 ${playfair.className}`}>
                Reviews
              </h2>

              {experiences.length === 0 && (
                <p className="text-gray-500">No reviews yet. Be the first!</p>
              )}

              <div className="space-y-5">
                {experiences.map((rev, i) => (
                  <div key={i} className="border rounded-xl p-4 shadow-sm bg-white">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{rev.user}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(rev.date).toLocaleDateString()}
                        </p>

                        <p className="text-gray-700 mt-3">{rev.description || rev.comment}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {rev.tags?.map((t, idx) => (
                            <span
                              key={idx}
                              className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="w-[120px] h-[120px] rounded-lg overflow-hidden ml-4">
                        <img
                          src={rev.photos?.[0] || "/avatar-placeholder.png"}
                          className="w-full h-full object-cover"
                          alt="experience"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ADD REVIEW FORM */}
            <div className="mt-6 max-w-xl">
              <h2 className={`font-semibold text-lg mb-3 ${playfair.className}`}>
                Write a Review
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const formData = new FormData(e.target);

                  let photoBase64 = "";
                  const file = formData.get("photo");

                  if (file && file.size > 0) {
                    photoBase64 = await convertToBase64(file);
                  }

                  const reviewData = {
                    user: formData.get("name"),
                    rating: Number(formData.get("rating")),
                    comment: formData.get("comment"),
                    photos: photoBase64 ? [photoBase64] : []
                  };

                  const res = await fetch(
                    `http://localhost:5000/api/destinations/${id}/review`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(reviewData),
                    }
                  );

                  const updated = await res.json();

                  if (updated.reviews) {
                    setDestination({
                      ...destination,
                      experiences: updated.reviews,
                    });
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

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="w-full border p-2 rounded"
                />

                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="mt-10 md:mt-0 md:w-[350px] space-y-6">

            {/* HIGHLIGHT BOX */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className={`bg-teal-700 text-white px-5 py-3 text-lg font-bold ${playfair.className}`}>
                Highlight
              </div>

              <ul className="p-5 space-y-3 text-gray-700">
                <li
                  className="hover:text-teal-600 cursor-pointer"
                  onClick={() =>
                    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Summary
                </li>

                <li
                  className="hover:text-teal-600 cursor-pointer"
                  onClick={() =>
                    document.getElementById("attractions-section").scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Includes / Excludes
                </li>

                <li
                  className="hover:text-teal-600 cursor-pointer"
                  onClick={() =>
                    document.getElementById("tours-section").scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Tours
                </li>

                <li
                  className="hover:text-teal-600 cursor-pointer"
                  onClick={() =>
                    document.getElementById("experiences-section").scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Reviews
                </li>
              </ul>
            </div>

            {/* QUICK INFO */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className={`text-lg font-semibold mb-3 ${playfair.className}`}>
                Quick Info
              </h3>

              <div className="space-y-2 text-gray-700">
                <p>Gallery Images: {gallery.length}</p>
                <p>Attractions: {attractions.length}</p>
                <p>Total Reviews: {experiences.length}</p>
                <p>Total Tours: {tours.length}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* GALLERY */}
        <section className="mt-12">
          <h2
            className={`text-2xl font-semibold mb-4 text-teal-700 ${playfair.className}`}
          >
            Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={img}
                  alt={`gallery-${idx}`}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

// Utility: Convert image to Base64
async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
