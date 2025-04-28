import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

const HelperLayout = () => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
   
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HelperLayout;
