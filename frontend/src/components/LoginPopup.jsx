"use client";

import GoogleLoginButton from "./GoogleLoginButton";
import Image from "next/image";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function LoginPopup({ onClose }) {
  const [tab, setTab] = useState("login");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Popup Box */}
      <div className="w-[900px] bg-white rounded-xl shadow-xl flex relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-200 hover:text-black text-2xl"
        >
          ×
        </button>

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <Image
            src="https://htmldesigntemplates.com/html/travelin/images/trending/trending5.jpg"
            width={500}
            height={600}
            className="w-full h-full object-cover rounded-l-xl"
            alt="Login Popup Image"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className={`w-1/2 p-10 ${playfair.className}`}>


          {/* TABS */}
          <div
            className={`flex justify-between mb-6 border-b pb-2 ${playfair.className}`}
          >
            <button
              onClick={() => setTab("login")}
              className={`text-lg font-semibold ${
                tab === "login"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={`text-lg font-semibold ${
                tab === "register"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* HEADING */}
          <h2
            className={`text-2xl font-bold mb-4 capitalize ${playfair.className}`}
          >
            {tab}
          </h2>

          {/* GOOGLE AUTH BUTTON */}
          <div className="flex justify-center mb-5">
            <GoogleLoginButton />
          </div>

          <div className="text-center text-gray-400 my-3">OR</div>

          {/* FORM */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 border rounded-lg ${playfair.className}`}
            />

            <input
              type="password"
              placeholder="Password"
              className={`w-full p-3 border rounded-lg ${playfair.className}`}
            />

            <button
              className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition ${playfair.className}`}
            >
              {tab === "login" ? "Login" : "Register"}
            </button>
          </div>

          {/* SWITCH TEXT */}
          <p className={`text-center text-sm mt-4 ${playfair.className}`}>
            {tab === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-teal-600 cursor-pointer"
                  onClick={() => setTab("register")}
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-teal-600 cursor-pointer"
                  onClick={() => setTab("login")}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Simple Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
