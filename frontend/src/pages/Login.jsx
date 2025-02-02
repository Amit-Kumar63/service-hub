import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { signInWithPopup, auth, provider } from '../firebase-config';
import { CircularProgress } from '@mui/material';
import { SetTitle } from '../components/SetTitle';

const Login = () => {
  const [loginStatus, setLoginStatus] = useState({  message: '', severity: '' });
  const [isToastOpen, setIsToastOpen] = useState(false)

  const submitHandler = async () => {
    const result = await signInWithPopup(auth, provider)
        const user = result.user;
        const token = await user.getIdToken();  
        if (!token) throw new Error('Token not return from firebase')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { token })
      
      if(response.status === 200) {
        <CircularProgress sx={{marginLeft: 'auto', marginRight: 'auto'}} />
        localStorage.setItem('token', response.data.token);
        setLoginStatus({ message: 'Login successful', severity: 'success' });
        setIsToastOpen(true);
        setTimeout(() => {
          setIsToastOpen(false);
          window.location.href = '/user/home';
        }, 1000);
      }

    } catch (error) {
      setLoginStatus({ message: `${error.response?.data.message || error.message}`, severity: 'error' });
        setIsToastOpen(true);
        setTimeout(() => {
          setIsToastOpen(false);
        }, 2000);
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className=" h-screen bg-gray-100 p-4">
        <Link to="/user/home" className="absolute top-4 left-4 text-2xl font-bold text-gray-600">&larr;</Link>
      <div className='flex flex-col mt-20'>
      <h1 className="text-2xl font-bold mb-8 text-center">Welcome back</h1>
      <button onClick={submitHandler} className="w-full flex items-center justify-center mb-4 py-1 border border-solid border-blue-600 text-blue-600 text-lg font-semibold rounded-3xl">
        <img 
        src="/google.png" 
        alt="google-icon-png" 
        className='w-12 h-12 object-cover'
        /> 
        Sign in with Google
      </button>
      <p className="text-sm font-bold text-center">
        New user?{' '}
        <Link to="/user/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
      </div>
      <Toast message={loginStatus.message} severity={loginStatus.severity} isOpen={isToastOpen} />
      <SetTitle title="Login" />
    </div>
  );
};

export default Login;
