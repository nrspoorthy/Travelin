"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"]
});

const slides = [
  {
    image: "https://htmldesigntemplates.com/html/travelin/images/slider/1.jpg",
    subtitle: "Amazing Places",
    title: "Make Your Trip Fun & Noted",
    text:"Discover top destinations, explore detailed guides, and organize your entire trip effortlessly with our all-in-one travel platform.",
    buttons: [{ label: "Discover More", link: "#" }],
  },
  {
    image: "https://htmldesigntemplates.com/html/travelin/images/slider/2.jpg",
    subtitle: "Explore Travel",
    title: "Start Planning Your Dream Trip",
    text:  "From finding the best places to securing bookings, enjoy a seamless travel experience tailored to your preferences and interests.",
    buttons: [
      { label: "Read More", link: "#" },
      { label: "Contact Us", link: "#" },
    ],
  },
  {
    image: "https://htmldesigntemplates.com/html/travelin/images/slider/3.jpg",
    subtitle: "Road To Travel",
    title: "Begin Your Adventure With Us",
    text: "Discover new experiences, manage reservations, and explore the world with confidence through our smart travel planning system.",
    buttons: [{ label: "Make An Enquiry", link: "#" }],
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="w-full h-full bg-black/50 flex items-center justify-center px-4 md:px-0">
            <div className="text-center text-white max-w-3xl">
              <h4 className="text-lg md:text-xl font-semibold mb-2">{slide.subtitle}</h4>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{slide.title}</h1>
              <p className="text-sm md:text-lg mb-6">{slide.text}</p>
              <div className="flex justify-center flex-wrap gap-3 md:gap-4">
                {slide.buttons.map((btn, i) => (
                  <Link
                    key={i}
                    href={btn.link}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base font-medium"
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

            <button
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 
                  bg-teal-600 text-white p-3 rounded-full z-20 hover:bg-teal-700"
      >
        <FaArrowLeft />
      </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 
                    bg-teal-600 text-white p-3 rounded-full z-20 hover:bg-teal-700"
        >
          <FaArrowRight />
        </button>

      <div className="absolute -bottom-7 left-0 w-full z-25">
  <Image
    src="https://htmldesigntemplates.com/html/travelin/images/shape-pat.png"
    alt="Section shape pattern"
    width={1920}
    height={200}
    className="w-full h-auto"
    unoptimized
  />
</div>

    </section>
  );
}
