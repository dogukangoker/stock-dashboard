import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import withoutAuthProtection from "../../hoc/without-auth";
import "./auth-layout.scss";

const AuthLayout = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper className="auth-layout" elevation={0}>
        <div className="auth-layout__content">
          <Outlet />
        </div>
      </Paper>
    </Box>
  );
};

export default withoutAuthProtection(AuthLayout);
