import { useState } from 'react';
import AddressSuggestion from '../components/AddressSuggestion.jsx';
import { useAddAddressMutation, useAddProviderAddressMutation } from '../app/api/api.js';
import Toast from './Toast.jsx';
import { useOutletContext } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const AddAddressPopup = ({setAddAddressPanel, isProviderAddress=false}) => {
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [isToastOpen, setIsToastOpen] = useState(false)
    
    const { token } = useOutletContext()

    const [addAddress, { isLoading, isError, error, isSuccess }] = isProviderAddress ? useAddProviderAddressMutation() : useAddAddressMutation()
    const handleAddress = async () => {
      try {
        await addAddress({address, phone, token})
        if (isError) console.error('something went wrong while adding address', error)
        if (isSuccess) console.log('address added successfully')
        setAddAddressPanel(false)
        setIsToastOpen(true)
      } catch (error) {
        console.error(error)
      }
    }
    if (isLoading) {
      return <div className='w-full h-full flex justify-center items-center'><CircularProgress/></div>
    }
  return (
    <div className='w-full bg-white border-t rounded-lg border-solid border-gray-300 flex justify-center items-center'>
        <div className='h-full w-full p-3'>
        <h1 onClick={() => setAddAddressPanel(false)} className='text-center text-gray-300'><i className="text-4xl ri-subtract-line"></i></h1>        
        <h4 className='text-xl font-semibold text-center mb-6'>Please add your address</h4>
        <AddressSuggestion address={address} setAddress={setAddress}/>
        <input 
        type="text" 
        placeholder="Enter your phone number" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='w-full py-3 px-4 border border-gray-300 bg-[#E8EEF2] rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button onClick={handleAddress} className='w-full mt-5 bg-blue-500 text-white px-4 py-3 font-semibold rounded-lg'> 
            Confirm address
        </button>
        </div>
        <Toast message={'Address added successfully'} severity={'success'} isOpen={isToastOpen} />
    </div>
  )
}

export default AddAddressPopup