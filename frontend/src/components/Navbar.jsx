"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthModol from "@/components/AuthModol";
import { useRouter } from "next/navigation";

export default function Navbar({ onLoginCheck }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [todayStr, setTodayStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

 
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setTodayStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );

      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setIsLoggedIn(false);
          onLoginCheck?.(false);
          return;
        }

        const data = await res.json();
        setIsLoggedIn(data.success);
        onLoginCheck?.(data.success);
      } catch {
        setIsLoggedIn(false);
        onLoginCheck?.(false);
      }
    };

    checkLogin();
  }, []);

  const handleProtectedNav = (path) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    setMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    document.cookie = "token=; Path=/; Max-Age=0;";
    setIsLoggedIn(false);
    onLoginCheck?.(false);
    setMenuOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    onLoginCheck?.(true);
  };

  return (
    <div className="w-full">
      {/* TOP BAR */}
      <div className="hidden md:flex bg-teal-600 text-white text-sm justify-between items-center px-6 py-2">
        <div className="flex space-x-6">
          <span>{todayStr}</span>
          <span>Tollywood, India</span>
          <span>{timeStr}</span>
        </div>

        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-red-300">
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-yellow-300"
            >
              Login / Register
            </button>
          )}

          <button
            onClick={() => handleProtectedNav("/destinations")}
            className="bg-white text-teal-600 px-3 py-1 rounded"
          >
            Book Now
          </button>
        </div>
      </div>

      
      <header className="bg-white shadow-md">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-2">
          <div className="relative w-36 h-14 md:w-42 md:h-20">
            <Link href="/">
              <Image
                src="https://htmldesigntemplates.com/html/travelin/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          
          <nav className="hidden md:flex space-x-5 text-gray-700">
            <Link href="/">Home</Link>
            <button onClick={() => handleProtectedNav("/about")}>About Us</button>
            <button onClick={() => handleProtectedNav("/destinations")}>
              Destinations
            </button>
            <button onClick={() => handleProtectedNav("/tours")}>Tours</button>
            <button onClick={() => handleProtectedNav("/bookings/status")}>
              Bookings
            </button>
            <button onClick={() => handleProtectedNav("/account")}>Profile</button>
          </nav>

          
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl text-gray-800"
          >
            ☰
          </button>
        </div>
      </header>

      
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72
        bg-gradient-to-b from-[#0f0c1d] to-[#1a1633]
        transform transition-transform duration-700 ease-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col divide-y divide-white/10 text-white text-lg font-medium">
          <button onClick={() => handleProtectedNav("/")}>HOME</button>
          <button onClick={() => handleProtectedNav("/about")}>ABOUT US</button>
          <button onClick={() => handleProtectedNav("/destinations")}>
            DESTINATIONS
          </button>
          <button onClick={() => handleProtectedNav("/tours")}>TOURS</button>
          <button onClick={() => handleProtectedNav("/bookings/status")}>
            BOOKINGS
          </button>
          <button onClick={() => handleProtectedNav("/blog")}>BLOG</button>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-400">
              LOGOUT
            </button>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="text-teal-300"
            >
              LOGIN / REGISTER
            </button>
          )}
        </nav>
      </div>

      
      {showLogin && (
        <AuthModol
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
