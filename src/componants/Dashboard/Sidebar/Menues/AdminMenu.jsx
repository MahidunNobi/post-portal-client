import { NavLink } from "react-router-dom";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <div className="divider text-primary-orange/80 before:bg-primary-orange/20 after:bg-primary-orange/20 text-xs">
        Admin
      </div>
      <li className=" ">
        <NavLink
          to={"/dashboard"}
          end
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-300" : ""
            } w-full h-full block font-medium p-2 rounded-lg text-sm`
          }
        >
          Admin Profile
        </NavLink>
      </li>
      <MenuItem route={"/dashboard/manage-users"} title={"Manage Users"} />
      <MenuItem route={"/dashboard/activities"} title={"Activities"} />
      <MenuItem route={"/dashboard/announcement"} title={"Announcement"} />
      <MenuItem route={"/dashboard/survey"} title={"Survay"} />
    </>
  );
};

export default AdminMenu;
