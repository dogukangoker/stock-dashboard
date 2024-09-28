import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useProtectedMutation } from "../services/auth";
import Loading from "../components/loading/loading";

const withoutAuthProtection = (WrappedComponent: React.ComponentType) => {
  const WithoutAuth = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [checkProtected, { isLoading }] = useProtectedMutation();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        checkProtected()
          .unwrap()
          .then(() => {
            setIsAuthenticated(true);
          })
          .catch(() => {
            localStorage.removeItem("accessToken");
            setIsAuthenticated(false);
          });
      } else {
        setIsAuthenticated(false);
      }
    }, [checkProtected]);

    if (isLoading || isAuthenticated === null) {
      return <Loading />;
    }

    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithoutAuth;
};

export default withoutAuthProtection;
