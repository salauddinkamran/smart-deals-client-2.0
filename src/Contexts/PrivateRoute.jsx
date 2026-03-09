import React, { use } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <RiseLoader />
    </div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/register" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
