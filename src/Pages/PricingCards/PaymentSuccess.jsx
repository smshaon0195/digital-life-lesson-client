import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
const plan = state?.plan;

const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Payment Receipt", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.text(`Plan: ${plan?.name || "N/A"}`, 20, 50);
    doc.text(`Price: ${plan?.price || "N/A"} / month`, 20, 60);
    doc.text(`VAT: 0 / month`, 20, 70);
    doc.text(`Total: ${plan?.price || "N/A"}`, 20, 80);

    doc.text("Thank you for your payment!", 20, 100);

    // PDF ডাউনলোড
    doc.save("Payment_Summary.pdf");
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5">
      <div className="bg-[#111] p-10 rounded-2xl text-center border border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)] max-w-md w-full">
        {/* Icon */}
        <div className="text-green-400 text-6xl mb-4">✔</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>

        {/* Description */}
        <p className="text-gray-400 mb-6">Your subscription has been activated successfully.</p>

        {/* Plan Info (optional) */}
        <div className="bg-black p-4 rounded-lg mb-6 border border-gray-700">
          <p className="text-sm text-gray-400">Plan</p>
          <p className="text-lg font-semibold text-orange-400">primis</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-yellow-400 text-black hover:opacity-90"
          >
            Download Pdf
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
