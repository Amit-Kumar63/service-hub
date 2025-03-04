import React from 'react';
import { Link } from 'react-router-dom';

const InfoForGuest = ({path}) => { 
    const redirectTo = path.split('/')[1]
  return (
    <div className='w-full h-screen bg-gray-200 flex justify-center items-center p-6'>
      <div className='max-w-md bg-white shadow-lg rounded-lg p-6 text-center'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Guest Mode Information</h2>
        <p className='text-gray-600'>
          Guest mode is available only for testing purposes. Your session will be temporary, and data may not be saved. 
          To access all features, please create an account or log in.
        </p>
        <Link to={`/${redirectTo}/home`} className='flex items-center justify-center py-2 mt-4 rounded-md bg-black text-white font-semibold'>
        Understand
        </Link>
        <Link to={`/${redirectTo}/how-we-work`} className='flex items-center justify-center py-2 mt-4 rounded-md bg-slate-500 text-white font-semibold'>
        How this app work?
        </Link>        
      </div>
    </div>
  );
}

export default InfoForGuest;
