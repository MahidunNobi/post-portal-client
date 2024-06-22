import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}> Home </NavLink>
      </li>

      <li>
        <NavLink to={"/membership"}> Membership </NavLink>
      </li>
    </>
  );

  const { user, logout } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosPublic("/announcements");
      return data;
    },
  });

  return (
    <div className="border-b border-primary-orange">
      <div className="navbar container mx-auto justify-between">
        <div className="navbar-start">
          {/* Mobile dropdown menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu bg-white border border-gray-300 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          {/* Logo */}
          <a className=" h-8 md:h-12">
            <Logo />
          </a>
        </div>
        {/* Dextop menu */}
        <div className="navbar-end flex-1 hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end w-auto flex items-center gap-2">
          <button className="text-3xl relative">
            <IoIosNotificationsOutline />
            <span className="bg-primary-orange rounded-full text-sm py-1 px-2 absolute -top-2 -right-2">
              {announcements.length}
            </span>
          </button>

          {user ? (
            <div className="dropdown">
              {/* -------Profile section------ */}
              {/* Clickable button */}
              <div tabIndex={0} role="button" className="m-1">
                <div className="avatar">
                  <div className="w-12 mask mask-squircle">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </div>
              {/* Menu List */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-0 -left-[100px] bg-white border border-gray-200 shadow-gray-400 shadow-lg rounded-box w-40"
              >
                <p className="p-4">{user?.displayName}</p>
                <li className="border-y border-gray-200">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="text-primary-orange border-2 px-3 py-2 rounded-lg font-medium border-primary-orange hover:bg-primary-orange hover:text-white duration-150">
                Join US
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
