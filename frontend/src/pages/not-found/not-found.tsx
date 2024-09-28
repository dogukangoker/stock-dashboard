import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./not-found.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <Typography variant="h1" className="not-found__title">
        404
      </Typography>
      <Typography variant="h6" className="not-found__subtitle">
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
