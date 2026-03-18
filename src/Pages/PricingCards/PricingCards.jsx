import React from "react";

const PricingCards = () => {
  const plans = [
    {
      name: "Basic",
      price: "$3",
      features: [
        "Limited Photos",
        "Secure Online Transfer",
        "5 GB Cloud Storage",
        "24/7 Customer Service",
        "Automatic Backup",
      ],
      buttonColor: "bg-black text-white",
      featured: false,
    },
    {
      name: "Business",
      price: "$22",
      features: [
        "Unlimited Photos",
        "Secure Online Transfer",
        "15 GB Cloud Storage",
        "24/7 Customer Service",
        "Automatic Backup",
      ],
      buttonColor: "bg-orange-500 text-white",
      featured: true,
    },
    {
      name: "Unlimited",
      price: "$25",
      features: [
        "Unlimited Photos",
        "Secure Online Transfer",
        "50 GB Cloud Storage",
        "24/7 Customer Service",
        "Automatic Backup",
      ],
      buttonColor: "bg-black text-white",
      featured: false,
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition transform hover:scale-105`}
          >
            {plan.featured && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                Featured
              </span>
            )}

            <h3 className="text-2xl font-bold text-orange-500 mb-4">{plan.name}</h3>

            <div className="text-4xl text-black font-extrabold mb-4">{plan.price}</div>
            <div className="text-gray-500 mb-6">per month</div>

            <ul className="mb-6 space-y-2 text-gray-700">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-orange-500">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 cursor-pointer rounded-md font-bold ${plan.buttonColor} hover:opacity-90 transition`}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
