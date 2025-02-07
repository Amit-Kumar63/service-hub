import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UserProtectWrapper = ({ children }) => {
    const { isLoading, isError, isSuccess, token, isTokenLoading } = useOutletContext()

    const navigate = useNavigate();

    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
            <CircularProgress />
        </div>
    }

    if (isTokenLoading) {
        return <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
            <h4 className='font-semibold text-gray-500'>Please wait while we verify your credentials.</h4>
        </div>
    }

    useEffect(() => {
        if (!token || isError ) {
            navigate('/user/login');
        }
    }, [token, isError, isTokenLoading, navigate]);   

    return <div>
        {isSuccess && children}
    </div>;
};

export default UserProtectWrapper;
