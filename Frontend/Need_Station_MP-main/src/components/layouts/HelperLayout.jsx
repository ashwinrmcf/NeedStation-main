import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

const HelperLayout = () => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden" style={{marginTop: 0, paddingTop: 0}}>
      {/* Background gradient */}  
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      </div>

      {/* Fixed sidebar */}
      <div className="sticky top-0 h-screen z-10">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto z-10 relative">
        <Outlet />
      </div>
    </div>
  );
};

export default HelperLayout;
