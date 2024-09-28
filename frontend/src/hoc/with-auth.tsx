import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useProtectedMutation } from "../services/auth";
import Loading from "../components/loading/loading";

const authProtection = (WrappedComponent: React.ComponentType) => {
  const ProtectedComponent = (props: any) => {
    const [protectedCheck, { isLoading, isError }] = useProtectedMutation();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        protectedCheck();
      }
    }, [protectedCheck]);

    if (isLoading) {
      return <Loading />;
    }

    if (isError || !localStorage.getItem("accessToken")) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default authProtection;
