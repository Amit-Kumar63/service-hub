import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, signInWithPopup, provider, signOut } from '../firebase-config.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ProviderSignup = () => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
    const submitHandler = async () => {
      setIsLoading(true)
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user;
        const token = await user.getIdToken();
        if (!user) setIsLoading(false)
        if (!token) throw new Error('Token not return from firebase')

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/providers/register`, { token });    

          if (response.status === 201) {
            localStorage.setItem('providerToken', token);
            navigate('/provider/home', {state: { showToast: true, message: `Welcome ${response.data.provder.name}`, severity: "success"}});
          }
        } catch (error) { 
          await signOut(auth)
          toast.error(error.response?.data.message || 'Something went wrong, please try again')
          localStorage.removeItem('providerToken');
          setIsLoading(false)
          console.error("Error:", error.response?.data || error.message);
        }
    }
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-6">ServiceHub</h1>
      <h2 className="text-2xl font-semibold mb-6">Create a Provider account</h2>
      <button onClick={submitHandler} className="w-full flex items-center justify-center mb-4 py-1 border border-solid border-blue-600 text-blue-600 text-lg font-semibold rounded-3xl">
        {
          isLoading ?  <CircularProgress color="inherit" size={30} sx={{ marginTop: '10px', marginBottom: '10px' }} /> : 
          <>
          <img 
        src="/google.png" 
        alt="google-icon-png" 
        className='w-12 h-12 object-cover'
        /> 
        Sign up with Google
          </>
        }        
      </button>
      <p className="text-sm text-gray-600 mb-6 text-center">
        By continuing, you agree to the{' '}
        <Link to="/terms" className="text-blue-500 hover:underline">
          Terms of Use
        </Link>
        . Read our{' '}
        <Link to="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default ProviderSignup;