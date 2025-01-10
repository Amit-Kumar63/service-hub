import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../app/api/api';
import { CircularProgress } from '@mui/material';

const UserProtectWrapper = ({ children, token, isLoading, isError, isSuccess }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && (!token || isError)) {
            navigate('/login');
        }
    }, [token, isError]);   

    // if (isLoading) {
    //     return (
    //         <div>
    //             <h1>Loading...</h1>
    //         </div>
    //     );
    // }

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
