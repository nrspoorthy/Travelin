"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function AuthModol({ onClose, onLoginSuccess }) {
  const [tab, setTab] = useState("login");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // GOOGLE BUTTON
  useEffect(() => {
    if (!window?.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "filled_blue", size: "large", width: "100%" }
    );
  }, []);


  const handleGoogleResponse = async (response) => {
    setMsg("");

    const res = await fetch("/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    });

    const data = await res.json();
    if (!data.success) return setMsg("Google Login Failed");

    
    document.cookie = `token=${data.token}; path=/; max-age=604800;`;

    
    if (onLoginSuccess) onLoginSuccess();

    onClose();
  };

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    setMsg("");
    setLoading(true);

    const url =
      tab === "login"
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(data.message || "Something went wrong");
      return;
    }

    // AFTER REGISTER
    if (tab === "register") {
      setMsg("Registered Successfully! Please Login");
      setTab("login");
      return;
    }

    // ⭐ AFTER LOGIN: SAVE TOKEN
  document.cookie = `token=${data.token}; Path=/; Max-Age=604800; SameSite=Lax`;


    // ⭐ NOTIFY NAVBAR
    if (onLoginSuccess) onLoginSuccess();

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
      <div className="bg-white rounded-xl flex w-[95%] max-w-4xl overflow-hidden shadow-xl">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block relative">
          <Image
            src="https://htmldesigntemplates.com/html/travelin/images/trending/trending5.jpg"
            alt="auth-img"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-8 relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 text-sm"
          >
            X
          </button>

          {/* TABS */}
          <div className="flex items-center space-x-10 border-b pb-3">
            <button
              onClick={() => setTab("login")}
              className={`text-xl font-semibold ${
                tab === "login"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={`text-xl font-semibold  ${
                tab === "register"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-5 mb-4 capitalize">{tab}</h2>

          {/* GOOGLE LOGIN */}
          <div id="googleBtn" className="my-4 w-full"></div>

          <p className="text-center text-gray-400 my-2">OR</p>

          {/* ERROR */}
          {msg && <p className="text-center text-red-500 mb-3">{msg}</p>}

          {/* REGISTER NAME */}
          {tab === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              onChange={handleChange}
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}
          {tab === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              className="input"
              onChange={handleChange}
            />
          )}

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white p-3 rounded-lg mt-5 hover:bg-teal-700 transition"
          >
            {loading ? "Please Wait..." : tab === "login" ? "Login" : "Register"}
          </button>

          {/* SWITCH LINK */}
          <p className="text-center mt-4">
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

          <style jsx>{`
            .input {
              width: 100%;
              padding: 12px;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              margin-top: 12px;
            }
            .input:focus {
              border-color: #0d9488;
              outline: none;
              box-shadow: 0 0 3px #0d9488;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
