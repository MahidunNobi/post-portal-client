import { NavLink } from "react-router-dom";

const MenuItem = ({ route, title }) => {
  return (
    <li className=" ">
      <NavLink
        to={route}
        className={({ isActive }) =>
          `${
            isActive ? "bg-gray-300" : ""
          } w-full h-full block font-medium p-2 rounded-lg text-sm`
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

export default MenuItem;
