import React from "react";
import { useLocation, useNavigate } from "react-router";

const Payment = () => {
  const { state } = useLocation();
  const plan = state?.plan;
  const navigate = useNavigate();
  const handlePayment = (e) => {
  const form = e.target.closest("form");  // button থেকে parent form
  if (!form.checkValidity()) {
    form.reportValidity(); // required check দেখাবে
    return;
  }

    // 👉 এখানে payment logic (Stripe/API)

    navigate("/user-upgrade/payment-succes");
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-5 py-20">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">
        {/* LEFT: Plan Summary */}
        <div className="bg-[#111] p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Plan</span>
            <span className="text-orange-400">{plan.name}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Price</span>

            <span>{plan.price} / month</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Vat</span>

            <span>0 / month</span>
          </div>

          <div className="border-t border-gray-700 my-4"></div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>{plan.price}</span>
          </div>

          <p className="text-gray-400 text-sm mt-4">You will be billed monthly. Cancel anytime.</p>
        </div>

        {/* RIGHT: Payment Form */}
        <div className="bg-[#111] p-8 rounded-2xl border border-orange-400 shadow-[0_0_40px_rgba(255,165,0,0.2)]">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

          <form className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="text-sm text-gray-400">Card Number</label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Expiry</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">CVV</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400">Cardholder Name</label>
              <input
                type="text"
                required
                placeholder="SM Shaon Hossen"
                className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Button */}
            <button
              onClick={handlePayment}
              type="submit"
              className="w-full mt-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
