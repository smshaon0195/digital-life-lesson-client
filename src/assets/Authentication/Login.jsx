import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

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
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      }),
      console.log(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handelLogin)} className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className="text-center  flex-1  lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100  flex-1 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                {/* email Error */}
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    {" "}
                    Email is required
                  </p>
                )}
                <label className="label">Password</label>
                <input
                  {...register("password")}
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
              </fieldset>
              <p>
                You have no account?{" "}
                <Link to={"/auth/register"}>
                  <span className="text-green-500"> Register Now</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
