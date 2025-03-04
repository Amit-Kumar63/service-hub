import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const AddressSuggestion = ({address, setAddress, readOnly=false}) => {
    const [suggestion, setSuggestion] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')

    const handleAddressSuggestions = async (e) => {
        e.preventDefault();
        setAddress(e.target.value)
        if (e.target.value.length < 5) {
            return;
        }
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/geo/suggestions`, {
            params: {
                query: e.target.value
            }
        });
        setSuggestion(response.data.suggestions)
    }
    const handleSelectedAddress = (address) => {
        setAddress(address)
        setSelectedAddress('')
        setSuggestion([])
    }
  return (
    <div className='w-full'>
        <input
            type="text" 
            readOnly={readOnly}
            value={ !selectedAddress ? address : selectedAddress }
            placeholder="Enter full address" 
            onChange={ handleAddressSuggestions }
            required
            className={`w-full px-4 py-3 mb-5 text-wrap text-lg bg-[#E8EEF2] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${!readOnly ? 'text-gray-700' : 'text-gray-400'} ${!readOnly ? 'focus:ring-blue-500' : 'focus:ring-transparent'}`}
        />
        <div name="" id="" className='bg-gray-200 rounded-lg max-h-60 overflow-y-auto shadow-md'>
            {
                suggestion.length > 1 && suggestion.map((address, index) => (
                <div
                className={'px-4 py-2 bg-gray-300 rounded-md mb-3 font-semibold'}
                onClick={() => { handleSelectedAddress(address.place_name) }}
                key={index} 
                >
                    {address.place_name}
                </div>                  
                ))
            }
        </div>
        <p className='text-sm font-semibold mt-2 text-green-700 mb-3'>
        { selectedAddress && selectedAddress }
        </p>
    </div>
  )
}

export default AddressSuggestion