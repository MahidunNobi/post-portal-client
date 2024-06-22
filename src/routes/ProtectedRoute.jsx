import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate state={location.pathname} to="/login" />;
  return children;
};

export default ProtectedRoute;
