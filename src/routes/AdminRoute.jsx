import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isLoading, role, subscription] = useRole();
  const { loading } = useAuth();
  if (isLoading || loading) return <LoadingSpinner />;
  if (role === "admin") return children;

  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
