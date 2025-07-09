import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = ({ categories }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        categories={categories}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      <div className="lg:ml-64">
        <Outlet context={{ onToggleSidebar: toggleSidebar }} />
      </div>
    </div>
  );
};

export default Layout;