import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../Logo/logo.jpg";
import useAuth from "./../../Hooks/useAuth";
import Dashboard from "./../../Pages/Dashboard/Dashboard";

const Navber = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const nonUser = (
    <>
      <NavLink to={"/"} className={"mr-3"}>
        Home
      </NavLink>
      <NavLink to={"dashboard/Public-Lesson"} className={"mr-3"}>
        Public Lessons{" "}
      </NavLink>
      <NavLink to={"dashboard/Pricing"} className={"mr-3"}>
        Pricing{" "}
      </NavLink>
      <NavLink to={"dashboard/Add-Lesson"} className={"mr-3"}>
        {" "}
        Add Lesson
      </NavLink>
      <NavLink to={"dashboard/my-Lesson"} className={"mr-3"}>
        {" "}
        My Lessons
      </NavLink>
      <NavLink to={"/dashboard/favorites"} className={"mr-3"}>
        {" "}
        Favorites
      </NavLink>
    </>
  );

  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className="sticky top-0 left-0 bg-base-100 shadow-sm w-full">
      <div className="navbar w-[95%] mx-auto z-50">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* left bar */}
              <li>{nonUser}</li>
            </ul>
          </div>
          <img className="w-10 rounded-sm" src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" ">
            {/* Menubar */}
            <li className="">{nonUser}</li>
          </ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard"} className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li>
                  <Link onClick={handleSignOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to={"auth/login"}
              className={"mr-3 bg-green-600 px-5 p-2 rounded-sm font-bold hover-3d"}
            >
              login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
