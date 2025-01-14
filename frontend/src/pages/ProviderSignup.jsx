import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AddressSuggestion from '../components/AddressSuggestion';
import GetLocation from '../components/GetLocation';
import { CircularProgress } from '@mui/material';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProviderSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')
  const [getCurrentPosition, setGetCurrentPosition] = useState(true)
  const [addressFromCoords, setAddressFromCoords] = useState('')
  const [isAddressLoading, setIsAddressLoading] = useState(false)
  const [confirmAddressPanel, setConfirmAddressPanel] = useState(false)
  
  const navigate = useNavigate();
  const confirmAddressPanelref = useRef(null)
  const submitHandler = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/providers/register`, { firstName, lastName, email, password, phone, address },
        { headers: { 'Content-Type': 'application/json' } });
        const token = response.data.token;

        if (!token) {
          throw new Error('Token not return from server');
        }

        if (response.status === 201) {
          localStorage.setItem('provider-token', token);  
          navigate('/provider-home');
        }
      } catch (error) {   
        console.error("Error:", error.response?.data || error.message);
      }
  }
    const getAddressFromCoords = async (coords) => {
      if (!coords) {
        console.error("No coordinates provided");
        return null;
      }      
      const { lat, lng } = coords;
      const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}&country=IN`;
      
      try {
        setIsAddressLoading(true)
          const response = await axios.get(url);
          if (response.data && response.data.features && response.data.features.length > 0) {
            setAddressFromCoords(response.data.features[0].place_name); // Full address
          } else {
              return "Address not found";
          } 
      } catch (error) {
          console.error("Error fetching address:", error.message);
          return "Error fetching address";
      } finally {
        setIsAddressLoading(false)
        setConfirmAddressPanel(true)
      }
  };  
  useEffect(()=> {
    if (location) {
      getAddressFromCoords(location)
    }
  }, [location])

  useGSAP(()=> {
    if (confirmAddressPanel) {
      gsap.to(confirmAddressPanelref.current, {
        transform: 'translateX(0)',
        duration: 0.5
      })  
    } else{
      gsap.to(confirmAddressPanelref.current, {
        transform: 'translateX(100%)',
        duration: 0.5
      })
    }
    
  }, [confirmAddressPanel])
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 relative overflow-hidden"> 
      <h1 className="text-lg font-bold text-gray-800 mb-6">ServiceHub</h1>
      <h2 className="text-2xl font-semibold mb-6">Signup as a Service Provider</h2>
      <div ref={confirmAddressPanelref} className='absolute z-10 flex justify-center inset-0 bg-black bg-opacity-[60%] translate-x-full'>
      <div className='fixed w-[95%] rounded-md py-3 px-4 top-1/2 translate-y-[35%] bg-white'>
        <p className='text-base font-semibold leading-5 mb-2'>{addressFromCoords}</p>
        <span className='text-sm font-semibold text-red-600'>Do you want to use this address?</span>
        <div className='flex items-center gap-2 mt-2'>
        <button 
        onClick={() => {
          setAddress(addressFromCoords)
          setConfirmAddressPanel(false)
        }}
        className='bg-teal-700 text-white w-1/2 py-2 rounded-md font-semibold'>Yes</button>
        <button 
        onClick={() => setConfirmAddressPanel(false)}
        className='bg-red-500 text-white w-1/2 py-2 rounded-md font-semibold'>Cancel</button>
        </div>
      </div>  
      </div>
      {
        isAddressLoading && (
          <div className='absolute z-10 inset-0 bg-black opacity-[60%] flex items-center justify-center'>
            <CircularProgress/>
          </div>
        )
      }
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
      <div className="relative mt-7">
      <AddressSuggestion address={address} setAddress={setAddress} />
      <button
      type='button'
       onClick={() => setGetCurrentPosition(false)} 
       className='absolute -top-9 right-3 bg-[#ccc] flex items-center gap-1 text-gray-600 font-semibold text-sm py-1 px-3 rounded-md '>Get Current Location <i className="text-sm ri-map-pin-line"></i></button>
      </div>
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
      <button className='bg-[#0A090D] text-white font-semibold py-3 px-3 rounded-md w-full mt-3'>
        Continue
      </button>
      </form>      
      <GetLocation setLocation={setLocation} getCurrentPosition={getCurrentPosition} setGetCurrentPosition={setGetCurrentPosition}/>
    </div>
  )
}

export default ProviderSignup