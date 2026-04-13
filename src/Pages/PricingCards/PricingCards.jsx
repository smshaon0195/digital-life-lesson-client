import React from "react";
import { useNavigate } from "react-router";

const PricingCards = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Base",
      price: "Free",
      features: ["Calendar and Scheduling", "Broadcasts", "Conferencing"],
      button: "Selected Plan",
      active: false,
    },
    {
      name: "Premium",
      price: "10",
      features: ["Calendar and Scheduling", "Conferencing", "Unlimited Data Retention"],
      button: "Upgrade to Premium",
      active: true,
    },
    {
      name: "Unlimited",
      price: "25",
      features: ["Unlimited Plans", "Unlimited Events", "Unlimited Video Conferencing"],
      button: "Upgrade to Unlimited",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen  flex items-center justify-center px-5 sm:py-20 py-8">
      <div className="max-w-6xl w-full text-center">
        {/* Title */}
        <h1 className="sm:text-4xl text-2xl md:text-5xl font-bold mb-4">
          Chose The Plan and Enjoy
        </h1>
        <p className="text-gray-400 sm:mb-12 mb-5">Choose the plan that’s right for you</p>

        {/* Cards */}
        <div className="grid  md:grid-cols-3 gap-8 ">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative  rounded-2xl p-8 border-2 shadow-2xl border-white transition-all duration-300
              ${
                plan.active
                  ? " border-orange-400 shadow-[0_0_40px_rgba(255,165,0,0.4)] scale-105"
                  : " border-gray-800"
              }`}
            >
              {/* Badge */}
              {plan.active && (
                <span className="absolute top-4 right-4 bg-orange-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                  MOST POPULAR
                </span>
              )}

              {/* Name */}
              <h3 className={`text-xl mb-3 ${plan.active ? "text-orange-400" : "text-gray-400"}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-4xl font-extrabold mb-2">
                ${plan.price}
                {plan.price !== "Free" && <span className="text-sm text-gray-400"> /month</span>}
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-gray-400 text-left">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <span className="text-green-400">✔</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => navigate(`/pricing/${plan.name}`)}
                className={`mt-8 w-full cursor-pointer py-3 rounded-lg font-semibold transition
                ${
                  plan.active
                    ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
