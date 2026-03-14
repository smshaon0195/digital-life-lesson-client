import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data.email, data.password, data.name)
      .then((res) => {
        console.log(res.user);
        toast.success("Login Succesfull");
      })
      .catch((error) => {
  const message = error.message.replace("Firebase:", "");
  toast.error(message);
});

  };

  const password = watch("password", "");

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
          <h2 className="text-3xl font-bold mb-6 text-center">Register Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}

              {errors.email?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium">Password</label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label font-medium">Confirm Password</label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Register
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
