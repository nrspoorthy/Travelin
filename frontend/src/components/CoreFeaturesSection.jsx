"use client";

export default function CoreFeaturesSection() {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.710l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
          />
        </svg>
      ),
      title: "Tell Us What You Want To Do",
      desc: "Share your travel goals, and we’ll help you find the perfect destinations, activities, and trip plans that match your interests.",
      reviews: "100+ Reviews",
    },

    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
      title: "Share Your Travel Locations",
      desc: "Explore top-rated destinations with detailed guides, photos, and insights to make your journey well-planned and memorable.",
      reviews: "100+ Reviews",
    },

    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      ),
      title: "Share Your Travel Preference",
      desc: "Personalize your experience by selecting your travel style—adventure, luxury, budget, or family—and get tailored recommendations.",
      reviews: "100+ Reviews",
    },

    {
      id: 4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      title: "Here 100% Trusted Tour Agency",
      desc: "Our platform connects you with verified travel partners and trusted agencies to ensure safe, seamless, and reliable trip planning.",
      reviews: "100+ Reviews",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        
        <h3 className="playfair text-yellow-500 font-semibold uppercase mb-2 tracking-wide">
          Core Features
        </h3>

        <h2 className="playfair text-4xl font-bold text-[#17233E] mb-4 leading-[1.4]">
          Find <span className="text-teal-500">Travel Perfection</span>
        </h2>

        <p className="playfair text-gray-500 mb-12 max-w-2xl mx-auto text-[1.1rem] leading-[1.6]">
          Our travel platform helps users discover destinations, explore detailed place guides, and plan their trips with confidence. 
          Enjoy secure bookings, personalized suggestions, and a smooth travel-planning experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group overflow-hidden rounded-lg border border-gray-300 bg-white p-9 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg"
            >
              <div className="absolute inset-0 translate-y-full bg-teal-600 transition-transform duration-500 group-hover:translate-y-0"></div>

              <div className="relative z-10 flex flex-col items-center text-center transition-all duration-500 group-hover:text-white">
                <div className="text-teal-600 mb-4 transition-all duration-500 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="playfair text-lg font-semibold mb-3 text-[#17233E] group-hover:text-white leading-[1.4]">
                  {feature.title}
                </h3>

                <p className="playfair text-sm mb-4 text-gray-500 group-hover:text-teal-100 leading-[1.6]">
                  {feature.desc}
                </p>

                <p className="playfair font-medium text-teal-600 group-hover:text-white">
                  {feature.reviews}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
