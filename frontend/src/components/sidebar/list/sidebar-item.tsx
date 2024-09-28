import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import CustomNavLink from "../../nav-link/nav-link";

interface ISidebarItemProps {
  id: number;
  title: string;
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  id,
  title,
  path,
  icon: Icon,
}) => {
  return (
    <CustomNavLink to={path} className="sidebar-item">
      <Icon className="icon" color="action" />
      <span className="label">{title}</span>
    </CustomNavLink>
  );
};

export default SidebarItem;
