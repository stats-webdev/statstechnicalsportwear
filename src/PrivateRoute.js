import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Navigate for redirection, Outlet for nested routes

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
