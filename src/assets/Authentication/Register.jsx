import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      // 🔹 Firebase Register
      const res = await registerUser(data.email, data.password, data.name);

      // 🔹 Backend এ user save
      const userData = {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName || data.name,
      };

      await axiosSecure.post("/users", userData);

      toast.success("Registration Successful");

      reset(); // form clear
      navigate("/"); // redirect (optional)

    } catch (error) {
      const message = error.message.replace("Firebase:", "");
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Side */}
        <div className="flex flex-col justify-center p-10 bg-gradient-to-br from-primary/10 to-secondary/10">
          <h1 className="text-5xl font-bold mb-6">Create Account</h1>
          <p className="text-base-content/70 leading-relaxed">
            Join our platform and start exploring amazing features. Register your account to get
            full access and enjoy a smooth and secure experience.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Register Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label font-medium">Confirm Password</label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-2"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;