import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../app/api/api';
import { CircularProgress } from '@mui/material';

const UserProtectWrapper = ({ children, isLoading, isError, isSuccess }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && (!token || isError)) {
            navigate('/user/login');
        }
    }, [token, isError]);   

    return <div>
        {
            isLoading && (
                <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
                    <CircularProgress />
                </div>
            )
        }
        {isSuccess && children}
    </div>;
};

export default UserProtectWrapper;
