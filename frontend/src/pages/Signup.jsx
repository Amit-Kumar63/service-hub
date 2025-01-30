import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth, signInWithPopup, provider } from '../firebase-config.js';
import { useState } from 'react';
import Toast from '../components/Toast.jsx';

const Signup = () => {
  const [loginStatus, setLoginStatus] = useState({ message: '', severity: '' });
  const [isToastOpen, setIsToastOpen] = useState(false);

    const submitHandler = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user;
        const token = await user.getIdToken();
        if (!token) throw new Error('Token not return from firebase')

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, { name: user.displayName, email: user.email, token }, { headers: { 'Content-Type': 'application/json' } });    

          if (response.status === 201) {
            localStorage.setItem('token', token);
            setLoginStatus({ message: 'Signup successful', severity: 'success' });
            setIsToastOpen(true);
            setTimeout(() => {
            setIsToastOpen(false);
              window.location.href = '/user/home';
            }, 1000);
          } 
        } catch (error) { 
          console.error("Error:", error.response?.data || error.message);
        }
    }
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-6">ServiceHub</h1>
      <h2 className="text-2xl font-semibold mb-6">Create a ServiceHub account</h2>
      <button onClick={submitHandler} className="w-full flex items-center justify-center mb-4 py-1 border border-solid border-blue-600 text-blue-600 text-lg font-semibold rounded-3xl">
        <img 
        src="/google.png" 
        alt="google-icon-png" 
        className='w-12 h-12 object-cover'
        /> 
        Sign up with Google
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
            <Toast message={loginStatus.message} severity={loginStatus.severity} isOpen={isToastOpen} />
      
    </div>
  );
};

export default Signup;
