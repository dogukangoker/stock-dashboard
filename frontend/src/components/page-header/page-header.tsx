import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Popover } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth-slice";
import "./page-header.scss";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <div className="page-header">
      <div className="page-header__title-container">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      <div className="page-header__actions">
        <button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="page-header__icon-button"
        >
          <AccountCircleIcon />
        </button>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <div className="page-header__action">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(logout());
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default PageHeader;
