"use client";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function ErrorFallback({
  title = "Oops! Page Not Found",
  heading = "We Are Sorry, But The Page You Requested Was Not Found",
  showSubscribe = false,
  showHomeButton = true,
}) {
  return (
    <>
    <Navbar/>
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        
        <div>
          <p className="text-teal-600 font-semibold mb-3">
            {title}
          </p>

          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 leading-snug`}
          >
            {heading}
          </h1>

          {showSubscribe && (
            <div className="mt-6 flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button className="bg-teal-600 text-white px-6 py-3 rounded-r-lg hover:bg-teal-700">
                Subscribe
              </button>
            </div>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className="inline-block mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
            >
              GO TO HOMEPAGE
            </Link>
          )}
        </div>

        
        <div className="flex justify-center">
          <Image
            src="https://htmldesigntemplates.com/html/travelin/images/404-1.svg"
            alt="404 Not Found"
            width={520}
            height={420}
            priority
          />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
