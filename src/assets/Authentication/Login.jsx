import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaFacebook, FaGoogle } from "react-icons/fa6";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInWithGoogle, signInwithFacebook } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  // ✅ Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);

        const user = result?.user;

        // ✅ Safety check
        if (!user) {
          toast.error("User not found");
          return;
        }

        user.getIdToken().then((token) => {
          localStorage.setItem("access-token", token);

          const userDetails = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          };

          axiosSecure.put("/users", userDetails);

          toast.success("Google Login Successful");
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Login failed: " + error.message);
      });
  };
  const handleFacebookLogin = () => {
    toast("Update is Comming Soon");
    // signInwithFacebook()
    //   .then((result) => {
    //     console.log(result);

    //     const user = result?.user;

    //     // ✅ Safety check
    //     if (!user) {
    //       toast.error("User not found");
    //       return;
    //     }

    //     user.getIdToken().then((token) => {
    //       localStorage.setItem("access-token", token);

    //       const userDetails = {
    //         uid: user.uid,
    //         email: user.email,
    //         name: user.displayName,
    //       };

    //       axiosSecure.put("/users", userDetails);

    //       toast.success("Facebook Login Successful");
    //       navigate(location?.state || "/");
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Google Login failed: " + error.message);
    //   });
  };
  // ✅ Email + Password Login
  const handelLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result?.user;

        if (!user) {
          toast.error("User not found");
          return;
        }

        user.getIdToken().then((token) => {
          localStorage.setItem("access-token", token);

          const userDetails = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          };

          axiosSecure.put("/users", userDetails);

          toast.success("Login Successful");
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed: " + error.message);
      });
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
            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email"
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium">Password</label>
              <input
                {...register("password")}
                type="password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Password"
              />
            </div>

            {/* Forgot */}
            <Link to={"/auth/password-reset"}>
              <div className="text-right">
                <a className="link link-hover text-sm">Forgot password?</a>
              </div>
            </Link>

            {/* Email Login */}
            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
            </button>

            <span className="text-center flex justify-center items-center">Or</span>

            <div className="flex gap-3 mx-auto justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className=" btn-secondary cursor-pointer text-2xl text-green-400 bg-white rounded-xl p-2 inline-flex"
              >
                <FaGoogle />
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className=" btn-secondary cursor-pointer text-2xl text-green-400 bg-white rounded-xl p-2 inline-flex"
              >
                <FaFacebook />
              </button>
            </div>

            {/* Register */}
            <p className="text-center">
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
