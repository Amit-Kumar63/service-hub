import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UserProtectWrapper = ({ children }) => {
    const { isLoading, isError, isSuccess, token } = useOutletContext()

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
