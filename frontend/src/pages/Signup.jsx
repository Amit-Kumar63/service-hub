import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressSuggestion from '../components/AddressSuggestion.jsx';
import auth from '../firebase-config.js';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('')

    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
      signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        console.log('token',token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }

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
            navigate('/user/home');
          }
        } catch (error) { 
          console.error("Error:", error.response?.data || error.message);
        }
    }
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-6">ServiceHub</h1>
      <h2 className="text-2xl font-semibold mb-6">Create a ServiceHub account</h2>
      <div id='recaptcha-container'></div>
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
      <button className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg">
        Continue
      </button>
      <button 
      type='button'
      onClick={handleGoogleSignIn}
      className="w-full py-3 mt-5 bg-teal-600 text-white text-lg font-semibold rounded-lg">
        signInWithPopup
      </button>
      </form>
    </div>
  );
};

export default Signup;
