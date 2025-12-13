"use client";

import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  const instaImages = [
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-5.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-1.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-8.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-9.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-3.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-2.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-6.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-7.jpg",
    "https://htmldesigntemplates.com/html/travelin/images/insta/ins-4.jpg",
  ];

  return (
    <footer className="relative bg-[#0B1D33] text-white overflow-hidden">

      <div className="relative z-[2] pt-12 pb-2 text-center">
        
        <div className="flex justify-center gap-3 flex-wrap max-w-6xl mx-auto px-4">
          {instaImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-md shadow-md">
              <img
                src={img}
                alt="Instagram"
                className="w-28 h-28 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mb-6 mt-6">
          <span
            className={`${playfair.className} inline-block bg-white text-gray-800 px-4 py-2 rounded shadow-md font-semibold text-sm`}
          >
            <i className="fab fa-instagram mr-2 text-teal-600"></i> Follow On
            Instagram
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 pb-16 border-t border-white/10 pt-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://htmldesigntemplates.com/html/travelin/images/logo-white.png"
              alt="Travelin"
              className="w-8"
            />
            <h2
              className={`${playfair.className} text-2xl font-bold text-white`}
            >
              TRAVELIN
            </h2>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
            suspendisse leo neque iaculis molestie sagittis.
          </p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              <strong>PO Box:</strong> +47-252-254-2542
            </li>
            <li>
              <strong>Location:</strong> Collins Street, Sydney, Australia
            </li>
            <li>
              <strong>Email:</strong> info@Travelin.com
            </li>
            <li>
              <strong>Website:</strong> www.Travelin.com
            </li>
          </ul>
          
        </div>

        <div>
          <h3
            className={`${playfair.className} text-xl font-bold mb-4 relative`}
          >
            Quick Link
            <span className="absolute left-0 -bottom-1 w-10 h-0.5 bg-teal-500"></span>
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Customer Service</li>
            <li>Return Policy</li>
          </ul>
        </div>

        <div>
          <h3
            className={`${playfair.className} text-xl font-bold mb-4 relative`}
          >
            Categories
            <span className="absolute left-0 -bottom-1 w-10 h-0.5 bg-teal-500"></span>
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Travel</li>
            <li>Technology</li>
            <li>Lifestyle</li>
            <li>Destinations</li>
            <li>Entertainment</li>
            <li>Business</li>
          </ul>
        </div>

        <div>
          <h3
            className={`${playfair.className} text-xl font-bold mb-4 relative`}
          >
            Newsletter
            <span className="absolute left-0 -bottom-1 w-10 h-0.5 bg-teal-500"></span>
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Join our community of over 200,000 global readers who receive emails
            filled with news, promotions, and other good stuff.
          </p>
          <div className="flex mt-3">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-3 rounded-l-md text-gray-800 w-full outline-none bg-white placeholder-gray-500"
            />
            <button className="bg-teal-600 px-5 py-3 rounded-r-md text-white font-semibold hover:bg-teal-700 transition">
              
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-5 text-sm text-gray-400 gap-4">
          <div className="flex gap-5">
            <a href="#" className="hover:text-teal-500 transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-teal-500 transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
