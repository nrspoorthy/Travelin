"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EditProfilePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto flex py-10 px-4 gap-8">

          {/* LEFT SIDEBAR (Desktop only) */}
         
          {/* RIGHT CONTENT */}
          <section className="flex-1 max-w-3xl">

            <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

            {/* PROFILE PHOTO ROW */}
            <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-500"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    </div>

              </div>

              <div className="flex-1">
                <p className="font-semibold">spoorthi_.19</p>
                <p className="text-sm text-gray-500">SPOORTHI</p>
              </div>

              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                Change photo
              </button>
            </div>

            {/* FORM */}
            <form className="space-y-8">

            

              {/* BIO */}
              <FormRow label="Bio">
                <textarea
                  rows={3}
                  placeholder="Bio"
                  className="input resize-none"
                />
                <p className="text-xs text-gray-500 text-right">
                  0 / 150
                </p>
              </FormRow>

              {/* GENDER */}
              <FormRow label="Gender">
                <select className="input">
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </FormRow>

              {/* EMAIL */}
              <FormRow label="Email">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input"
                />
              </FormRow>

              {/* PHONE */}
              <FormRow label="Phone Number">
                <input
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  className="input"
                />
              </FormRow>

              {/* SAVE BUTTON */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>

            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------- COMPONENTS ---------- */

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-4 py-2 rounded-md cursor-pointer ${
        active
          ? "bg-gray-100 font-semibold"
          : "hover:bg-gray-50"
      }`}
    >
      {label}
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <label className="w-40 text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}
