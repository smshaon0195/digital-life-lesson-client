import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { Navigate } from "react-router";
import Loding from "../../../../Pages/NoData/Loding";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();

  if (loding) {
    return (
      <Loding></Loding>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
