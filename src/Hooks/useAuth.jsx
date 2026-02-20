import React, { use } from "react";
import { AuthContext } from "./../Firebase/AuthContext";

const useAuth = () => {
  const Authinfo = use(AuthContext);
  return Authinfo;
};

export default useAuth;
