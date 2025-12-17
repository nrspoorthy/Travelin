"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthModol from "@/components/AuthModol";
import { useRouter } from "next/navigation";

export default function Navbar({ onLoginCheck }) {
  const router = useRouter();

  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setIsLoggedIn(false);
          if (onLoginCheck) onLoginCheck(false);
          return;
        }

        const data = await res.json();
        if (data.success) {
          setIsLoggedIn(true);
          if (onLoginCheck) onLoginCheck(true);
        } else {
          setIsLoggedIn(false);
          if (onLoginCheck) onLoginCheck(false);
        }
      } catch {
        setIsLoggedIn(false);
        if (onLoginCheck) onLoginCheck(false);
      }
    };

    checkLogin();
  }, []);

 
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


  const handleProtectedNav = (path) => {
    if (!isLoggedIn) {
      setShowLogin(true); 
      return;
    }
    router.push(path); 
  };


  const handleLogout = () => {
    document.cookie = "token=; Path=/; Max-Age=0;";
    setIsLoggedIn(false);
    if (onLoginCheck) onLoginCheck(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    if (onLoginCheck) onLoginCheck(true);
  };

  return (
    <div className="w-full">

      
      <div className="hidden md:flex bg-teal-600 text-white text-sm justify-between items-center px-4 py-1 md:px-6 md:py-2">
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
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-1 py-1">

          
          <div className="relative w-36 h-14 md:w-42 md:h-20">
            <Image
              src="https://htmldesigntemplates.com/html/travelin/images/logo.png"
              alt="Logo"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          
          <nav className="hidden md:flex space-x-5 text-gray-700">
            <Link href="/">Home</Link>

            
            <button onClick={() => handleProtectedNav("/about")}>
              About Us
            </button>

            <button onClick={() => handleProtectedNav("/destinations")}>
              Destinations
            </button>

            <button onClick={() => handleProtectedNav("/tours")}>
              Tours
            </button>

            <button onClick={() => handleProtectedNav("/bookings/status")}>
              Bookings
            </button>


            <button onClick={() => handleProtectedNav("/blog")}>
              Blog
            </button>
          </nav>

         
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            ☰
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 shadow-lg">
            <nav className="flex flex-col space-y-4 text-gray-700 font-medium">

              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              
              <button onClick={() => handleProtectedNav("/about")}>About Us</button>
              <button onClick={() => handleProtectedNav("/destinations")}>Destinations</button>
              <button onClick={() => handleProtectedNav("/tours")}>Tours</button>
              <button onClick={() => handleProtectedNav("/bookings/status")}>
                Bookings
              </button>

              <button onClick={() => handleProtectedNav("/blog")}>Blog</button>

              
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-500"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                  className="text-teal-600"
                >
                  Login / Register
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      
      {showLogin && (
        <AuthModol
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
