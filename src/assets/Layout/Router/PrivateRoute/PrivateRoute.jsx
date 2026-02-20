import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();

  if (loding) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <span
          className="loading loading-infinity text-secondary"
          style={{ width: "120px", height: "120px" }}
        ></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Please wait, loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
