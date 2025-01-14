import React, { useEffect, useState } from 'react';
import { useGetCurrentLocationQuery } from '../app/api/api';
import { CircularProgress } from '@mui/material';

const GetLocation = ({ getCurrentPosition, setGetCurrentPosition }) => {
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('')
const getLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat:latitude, lng:longitude });
                },
                (error) => {
                    setError(error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };
        const { data, isError, isLoading, isSuccess} = useGetCurrentLocationQuery({coords: location}, {
        skip: !location
    })

    useEffect(()=> {
        if (isSuccess && setGetCurrentPosition) {
            setGetCurrentPosition(data.address)
        }
    }, [getCurrentPosition, isSuccess])
    useEffect(()=> {
        getLocation();
    }, [setGetCurrentPosition])
    return (
        <div>
            {
                isLoading && (
                    <div className='w-full font-semibold text-base text-gray-700 flex items-center justify-center gap-2'><p>Geting current address..</p> <CircularProgress size={20} color='#374151'/></div>
                )
            }
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GetLocation;
