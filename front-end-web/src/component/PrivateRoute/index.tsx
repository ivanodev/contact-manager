import React from "react";
import { Navigate } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";


interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;

const isAuthenticated = (): boolean => {
  return !!LocalStorageUtils.getAuthToken();
};