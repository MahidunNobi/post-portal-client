import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../SharedComponants/Logo/Logo";
import UserMenu from "./Menues/UserMenu";
import useRole from "../../../hooks/useRole";
import AdminMenu from "./Menues/AdminMenu";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ showMobileMenu, setShowMobileMenu }) => {
  const [isLoading, role, subscription] = useRole();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <ul
      className={`w-48 h-screen bg-gray-200 text-gray-700  p-2 space-y-2  fixed top-0 ${
        showMobileMenu ? "left-0" : "-left-full"
      } md:sticky duration-300 shadow-lg shadow-gray-600 z-10 md:shadow-none`}
    >
      <div className="h-12 flex justify-between">
        <Logo />
        <button
          onClick={() => setShowMobileMenu(false)}
          className="btn btn-circle btn-xs md:hidden bg-transparent border-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <li className=" ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-300" : ""
            } w-full h-full block font-medium p-2 rounded-lg text-sm`
          }
        >
          Home
        </NavLink>
      </li>

      {!isLoading && role === "user" && <UserMenu />}
      {!isLoading && role === "admin" && <AdminMenu />}
      <li className=" ">
        <button
          className={`
            w-full h-full block font-medium p-2 rounded-lg text-sm text-left`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default Sidebar;
