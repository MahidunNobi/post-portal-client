import LoadingSpinner from "../../../componants/SharedComponants/LoadingSpinner/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardDivider = () => {
  const roleData = useRole();
  const [isLoading, role, subscription] = roleData;
  if (isLoading) return <LoadingSpinner />;
  if (role === "admin") return <AdminDashboard />;
  if (role === "user") return <UserDashboard />;
  return;
};

export default DashboardDivider;
