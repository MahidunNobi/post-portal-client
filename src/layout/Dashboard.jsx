import { Outlet } from "react-router-dom";
import Sidebar from "../componants/Dashboard/Sidebar/Sidebar";
import MobileNavbar from "../componants/Dashboard/MobileNavbar/MobileNavbar";
import { useState } from "react";

const Dashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="relative min-h-screen w-[100vw] md:w-[98.5vw] md:flex bg-white">
      {/* --------Sidebar-------- */}

      <Sidebar
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <div className="md:flex-1">
        <MobileNavbar
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
