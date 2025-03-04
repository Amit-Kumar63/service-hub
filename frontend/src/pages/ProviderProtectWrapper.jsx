import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const ProviderProtectWrapper = ({ children }) => {
    const { isProviderLoading:isLoading, isProviderError:isError, isProviderSuccess:isSuccess, providerToken:token, isProviderTokenLoading:isTokenLoading } = useOutletContext()

    const navigate = useNavigate();

    useEffect(() => {
        if ( !isTokenLoading && (!token || isError)) {
            navigate('/provider/login');
        }
    }, [token, isError, navigate, isTokenLoading]);   

    
    if (isTokenLoading) {
            return <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
                <h4 className='font-semibold text-gray-500'>Please wait while we verify your credentials.</h4>
            </div>
        }
    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center bg-slate-300'>
            <CircularProgress />
        </div>
    }


    return isSuccess ? <div>{children}</div> : null;
};

export default ProviderProtectWrapper;
