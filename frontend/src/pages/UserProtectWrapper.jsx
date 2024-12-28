import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../app/api/api';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { isLoading, isError, isSuccess } = useGetUserQuery();

    useEffect(() => {
        if (!isLoading && (!token || isError)) {
            navigate('/login');
        }
    }, [token, isError]);   

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return <div>{children}</div>;
};

export default UserProtectWrapper;
