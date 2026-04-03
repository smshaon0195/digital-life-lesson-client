import React from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const PricingDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const handlePurchase = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to purchase this plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/user-upgrade/payment", {
          state: { plan },
        });
      }
    });
  };

  const plans = [
    {
      name: "Base",
      price: "Free",
      desc: "Perfect for personal use",
      features: ["Calendar and Scheduling", "Broadcasts", "Conferencing"],
    },
    {
      name: "Premium",
      price: "10",
      desc: "Best for professionals",
      features: ["Calendar and Scheduling", "Conferencing", "Unlimited Data Retention"],
    },
    {
      name: "Unlimited",
      price: "25",
      desc: "For teams and businesses",
      features: ["Unlimited Plans", "Unlimited Events", "Unlimited Video Conferencing"],
    },
  ];

  const plan = plans.find((p) => p.name === name);

  if (!plan) {
    return <div className="text-center text-white mt-20">Plan Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-5 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">{plan.name} Plan</h1>
          <p className="text-gray-400 mb-6">{plan.desc}</p>

          <h2 className="text-6xl font-extrabold">
            ${plan.price}
            {plan.price !== "Free" && <span className="text-lg text-gray-400"> /month</span>}
          </h2>

          <button
            onClick={handlePurchase}
            className="mt-6 cursor-pointer px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
          >
            Confirm Purchase
          </button>
        </div>

        {/* Glow Card Features */}
        <div className="bg-[#111] border border-orange-400 rounded-2xl p-10 shadow-[0_0_50px_rgba(255,165,0,0.3)]">
          <h3 className="text-2xl mb-6 text-orange-400">What’s included</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {plan.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-green-400 text-lg">✔</span>
                <span className="text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h4 className="text-xl mb-2">Secure</h4>
            <p className="text-gray-400 text-sm">Your data is fully encrypted and safe</p>
          </div>

          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h4 className="text-xl mb-2">Fast</h4>
            <p className="text-gray-400 text-sm">Lightning fast performance guaranteed</p>
          </div>

          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h4 className="text-xl mb-2">Support</h4>
            <p className="text-gray-400 text-sm">24/7 priority customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
