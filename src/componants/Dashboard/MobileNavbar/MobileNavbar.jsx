import { RiMenu2Fill } from "react-icons/ri";
import Logo from "../../SharedComponants/Logo/Logo";

const MobileNavbar = ({ showMobileMenu, setShowMobileMenu }) => {
  return (
    <div className="navbar bg-gray-200 text-gray-700 md:hidden">
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setShowMobileMenu(true)}
        >
          <RiMenu2Fill size={22} />
        </button>
      </div>
      <div className="flex-1">
        <div className="h-8">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
