import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressSuggestion from '../components/AddressSuggestion.jsx';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('')

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          console.log(address);
          
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, { firstName, lastName, email, password, phone, address },
          { headers: { 'Content-Type': 'application/json' } });
          const token = response.data.token;

          if (!token) {
            throw new Error('Token not return from server');
          }

          if (response.status === 201) {
            localStorage.setItem('token', token);
            navigate('/home');
          }
        } catch (error) { 
          console.error("Error:", error.response?.data || error.message);
        }
    }
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-6">ServiceHub</h1>
      <h2 className="text-2xl font-semibold mb-6">Create a ServiceHub account</h2>
      <form onSubmit={submitHandler}>
        <div className='flex gap-2'>
      <input
      onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        type="text"
        placeholder="First name"
        required
        className="w-1/2 px-4 py-3 mb-5 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        type="text"
        placeholder="Last name"
        className="w-1/2 px-4 py-3 mb-5 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        </div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email address"
        required
        className="w-full px-4 py-3 mb-5 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        type="number"
        placeholder="Phone number"
        required
        className="w-full px-4 py-3 mb-5 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        required
        className="w-full px-4 py-3 mb-5 text-lg bg-[#E8EEF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AddressSuggestion address={address} setAddress={setAddress} />
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
      <button className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600">
        Continue
      </button>
      </form>
    </div>
  );
};

export default Signup;
