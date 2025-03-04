import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup, auth, provider, signOut } from '../firebase-config';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import SignInAsGuest from '../components/SignInAsGuest'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const submitHandler = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      toast.loading('Logging in...', {toastId: 'loading'})
        const user = result.user;
        const token = await user.getIdToken();  
        if (!user) setLoading(false)
        if (!token) throw new Error('Token not return from firebase')
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { token })
      if(response.status === 200) {
        toast.dismiss('loading')
        localStorage.setItem('token', response.data.token);
        navigate('/user/home', { state: { showToast: true, message: `Welcome ${response.data.user.name}`, severity: "success"}});
      }
    } catch (error) {
      toast.dismiss('loading')
      setLoading(false)
      toast.error(error.response?.data.message || 'Something went wrong, please try again')
      console.error("Error:", error.response?.data || error.message);
        await signOut(auth)
        localStorage.clear()
        indexedDB.deleteDatabase('firebaseLocalStorage')
    } finally {
      toast.dismiss('loading')
      setLoading(false)
    }
  }

  return (
    <div className=" h-screen bg-gray-100 p-4">
        <Link to="/user/home" className="absolute top-4 left-4 text-2xl font-bold text-gray-600">&larr;</Link>
      <div className='flex flex-col mt-20'>
      <h1 className="text-2xl font-bold mb-8 text-center">Welcome back</h1>
      <button onClick={submitHandler} className="w-full flex items-center justify-center mb-4 py-1 border border-solid border-blue-600 text-blue-600 text-lg font-semibold rounded-3xl focus:scale-95">
        {
          loading ? <CircularProgress color="inherit" size={30} sx={{ marginTop: '10px', marginBottom: '10px' }} /> : 
          <>
        <img
        src="/google.png" 
        alt="google-icon-png" 
        className='w-12 h-12 object-cover'
        /> 
        Sign in with Google
          </>
        }
      </button>
      <SignInAsGuest redirectTo={'user'}/>
      <p className="text-sm font-bold text-center">
        New user?{' '}
        <Link to="/user/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
