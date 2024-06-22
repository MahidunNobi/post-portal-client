import useRole from "../../../hooks/useRole";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";

const ProfileDivider = () => {
  const [isLoading, role, subscription] = useRole();

  if (role === "admin") return <AdminProfile />;
  return <UserProfile />;
};

export default ProfileDivider;
