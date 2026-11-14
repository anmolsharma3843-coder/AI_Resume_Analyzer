
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onLogout={onLogout}
      />

      <div className="min-h-screen lg:pl-64">
        <Navbar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-0.5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
