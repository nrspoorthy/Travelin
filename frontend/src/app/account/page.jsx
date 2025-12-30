"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AccountPage() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    name: "Mounica Ratna",
    username: "mounica",
    role: "Buyer",
    email: "mounica@email.com",
    photo: null,
    bookingsCount: 0,
  });

  const [preview, setPreview] = useState(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-4 md:px-10 py-10">
        <div className="max-w-6xl mx-auto">

          {/* PROFILE HEADER */}
          <div className="flex flex-col md:flex-row md:items-center gap-10">

            {/* AVATAR */}
            <div className="flex justify-center md:justify-start">
              <div
                className="relative w-32 h-32 rounded-full border border-gray-300 overflow-hidden cursor-pointer"
                onClick={handleAvatarClick}
              >
                {preview || user.photo ? (
                  <Image
                    src={preview || user.photo}
                    alt="Profile"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                )}

                <span className="absolute bottom-1 right-1 bg-teal-600 text-white text-xs rounded-full px-2 py-0.5">
                  Edit
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* USER INFO */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-2xl font-semibold">
                  {user.username}
                </h2>

                <div className="flex gap-2">
                  <Link
                    href="/account/edit"
                    className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    href="/bookings/status"
                    className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                  >
                    My Bookings
                  </Link>
                </div>
              </div>

              <div className="flex gap-6 mt-4 text-sm">
                <span>
                  <b>{user.bookingsCount}</b> bookings
                </span>
              </div>

              <div className="mt-3 text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500">{user.role}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t mt-10"></div>

          {/* BOOKINGS SECTION */}
          <div className="flex flex-col items-center py-16">
            {user.bookingsCount === 0 ? (
              <>
                {/* <div className="w-20 h-20 border rounded-full flex items-center justify-center mb-4 text-gray-400">
                  
                </div> */}
                <h3 className="text-xl font-semibold">
                  No bookings yet
                </h3>
                <p className="text-gray-500 mt-2">
                  When you book a tour, it will appear here.
                </p>
                <Link
                  href="/tours"
                  className="text-teal-600 mt-4 hover:underline"
                >
                  Explore Tours
                </Link>
              </>
            ) : (
              <p>Your bookings list goes here</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
