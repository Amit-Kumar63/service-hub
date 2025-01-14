import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, redirectTo }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
