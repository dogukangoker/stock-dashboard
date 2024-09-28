import React from "react";
import { MENU_LIST } from "../../../shared/constants";
import SidebarItem from "./sidebar-item";
import "./sidebar-list.scss";

const SidebarList: React.FC = () => {
  return (
    <nav className="sidebar-list">
      {MENU_LIST.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          id={item.id}
          path={item.path}
          title={item.title}
        />
      ))}
    </nav>
  );
};

export default SidebarList;
