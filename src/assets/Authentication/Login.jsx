import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handelLogin = (data) => {
    console.log(data);
    (signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Login Succesfull");
        console.log(result.user);
        
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      }),
      console.log(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <form
        onSubmit={handleSubmit(handelLogin)}
        className="w-full max-w-5xl bg-base-100 shadow-2xl rounded-2xl overflow-hidden grid lg:grid-cols-2"
      >
        {/* Left Side */}
        <div className="flex flex-col justify-center p-10 bg-gradient-to-br from-primary/10 to-secondary/10">
          <h1 className="text-5xl font-bold mb-6">Login now!</h1>
          <p className="text-base-content/70 leading-relaxed">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <div className="space-y-4">
            <div>
              <label className="label font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email"
              />

              {errors.email?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Password</label>
              <input
                {...register("password")}
                type="password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Password"
              />
            </div>

            <div className="text-right">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
            </button>

            <p className="text-center pt-2">
              You have no account?{" "}
              <Link to={"/auth/register"}>
                <span className="text-green-500 font-semibold">Register Now</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
