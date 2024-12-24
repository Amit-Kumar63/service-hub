import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserDataContext } from '../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password })
      setUser(response.data.user);
      const token = response.data.token;

      if(!token) {
        throw new Error('Token not return from server');
      }

      if(response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className=" h-screen bg-gray-100 p-4">
      <button onClick={()=> navigate(-1) } className="absolute top-4 left-4 text-2xl font-bold text-gray-600">&larr;</button>
      <div className='flex flex-col mt-20'>
      <h1 className="text-2xl font-bold mb-8 text-center">Welcome back</h1>
      
      <form onSubmit={submitHandler}>
      <input
      onChange={(e) => setEmail(e.target.value)}
      value={email}
        type="email"
        placeholder="email"
        className="w-full px-4 py-3 mb-6 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
      onChange={(e) => setPassword(e.target.value)}
      value={password}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 mb-3 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <Link to="/forgot-password" className="text-sm text-[#69859B] hover:underline mb-6">
        Forgot password?
      </Link>
      
      <button className="w-full py-2 mb-4 mt-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600">
        Log in
      </button>
      </form>
      
      <p className="text-sm font-bold text-center">
        New user?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
