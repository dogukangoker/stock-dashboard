import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU_LIST } from "../../shared/constants";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h1 className="sidebar__logo">Stock Dashboard</h1>
      <nav className="sidebar__menu">
        {MENU_LIST.map(({ id, title, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`sidebar__menu-item ${
              location.pathname === path ? "active" : ""
            }`}
          >
            <Icon />
            {/* <span className="sidebar__menu-icon">{item.icon}</span> */}
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
