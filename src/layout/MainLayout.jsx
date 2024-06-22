import { Outlet } from "react-router-dom";
import Navbar from "../componants/SharedComponants/Navbar/Navbar";
import Footer from "../componants/SharedComponants/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen min-w-[100vw] bg-white text-gray-700 flex flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
