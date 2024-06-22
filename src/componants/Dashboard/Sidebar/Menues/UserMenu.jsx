import { NavLink } from "react-router-dom";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <div className="divider text-primary-orange/80 before:bg-primary-orange/20 after:bg-primary-orange/20 text-xs">
        USER
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
          My Profile
        </NavLink>
      </li>
      <MenuItem route={"/dashboard/add-post"} title={"Add Post"} />
      <MenuItem route={"/dashboard/my-posts"} title={"My Posts"} />
    </>
  );
};

export default UserMenu;
