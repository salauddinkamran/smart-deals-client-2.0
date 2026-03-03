import React, { use } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <RiseLoader />;
  }
  if (!user) {
    return <Navigate to="/" state={location.pathname} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
