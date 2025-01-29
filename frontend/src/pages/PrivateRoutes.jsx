import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

const PrivateRoute = ({ element, redirectTo }) => {
    const { user } = useOutletContext()
    return user ? element : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
