import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const FotgotPassword = () => {
  const { passwordResetEmail } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelResetLink = (data) => {
    const email = data.email;

    if (!email) {
      return toast.error("Please Enter Your Email");
    }
    setLoading(true);

    passwordResetEmail(email)
      .then(() => {
        toast.success("Password reset email sent!");
        reset();
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your email to receive a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handelResetLink)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full text-gray-500 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white transition duration-300 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
    }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Remember password?{" "}
          <a href="/auth/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default FotgotPassword;
