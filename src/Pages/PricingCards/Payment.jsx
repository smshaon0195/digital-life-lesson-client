import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import { getAuth } from "firebase/auth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Payment = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { state } = useLocation();
  const plan = state?.plan;
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePayment = async (formData) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Login first");
      return;
    }

    const token = await user.getIdToken();
    const data = {
      uid: user.uid,
      ...formData,
      planName: plan?.name,
      price: plan?.price,
      month: count,
      total: plan?.price * count,
      email: user.email,
    };

    try {
      const res = await axiosSecure.post("/payments", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error("Payment error:", error);
    }

    navigate("/user-upgrade/payment-succes");
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded-xl w-[350px] text-center border border-orange-400">
            <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>

            <p className="text-gray-400 mb-4">
              Pay <span className="text-orange-400 font-semibold">${plan.price * count}</span> ?
            </p>

            <div className="flex justify-center gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 rounded">
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  document.querySelector("form").requestSubmit(); // ✅ submit trigger
                }}
                className="px-4 py-2 bg-orange-400 text-black rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

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

              <span>$ {plan.price} / month</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Month</span>

              <span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrease}
                    className="px-3 cursor-pointer bg-red-500 text-white rounded"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={count}
                    readOnly
                    className="w-16 justify-center text-center border rounded"
                  />

                  <button
                    onClick={handleIncrease}
                    className="px-3 cursor-pointer bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </span>
            </div>

            <div className="border-t border-gray-700 my-4"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>$ {plan.price * count}</span>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              You will be billed monthly. Cancel anytime.
            </p>
          </div>

          {/* RIGHT: Payment Form */}
          <div className="bg-[#111] p-8 rounded-2xl border border-orange-400 shadow-[0_0_40px_rgba(255,165,0,0.2)]">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

            <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="text-sm text-gray-400">Card Number</label>
                <input
                  type="text"
                  {...register("cardNumber", { required: true })}
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
                    {...register("expiry", { required: true })}
                    placeholder="MM/YY"
                    className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">CVV</label>
                  <input
                    type="text"
                    {...register("cvv", { required: true })}
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
                  {...register("name", { required: true })}
                  placeholder="SM Shaon Hossen"
                  className="w-full mt-1 p-3 rounded-lg bg-black border border-gray-700 focus:border-orange-400 outline-none"
                />
              </div>

              {/* Button */}
              <button
                onClick={() => setShowModal(true)}
                type="button"
                className="w-full mt-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
