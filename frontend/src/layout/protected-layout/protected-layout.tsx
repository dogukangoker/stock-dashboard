import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import "./protected-layout.scss";

const ProtectedLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className={`protected-layout ${isMobileOpen ? "sidebar-open" : ""}`}>
      <Sidebar />
      <div className="content">
        <header>
          <button className="mobile-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
