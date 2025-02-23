import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AddressSuggestion from "./AddressSuggestion.jsx";
import GetLocation from "./GetLocation.jsx";
import DatePickerComponent from "./DatePicker.jsx";
import { CircularProgress } from "@mui/material";
import { useBookServiceMutation } from "../app/api/api.js";
import { toast } from "react-toastify";

const BookService = ({setBookServicePanel, selectedProviderId, selectedServicePrice, serviceType}) => {
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState('')
  const [getCurrentPosition, setGetCurrentPosition] = useState('')
  const [useCurrentLocationToFetch, setUseCurrentLocationToFetch] = useState(false)

  const { token, user, isLoading, refetch} = useOutletContext()
  const [bookService, { isLoading: isBookServiceLoading, isSuccess: isBookServiceSuccess, error: bookServiceError }] = useBookServiceMutation()

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user.address) {
      setAddress(user?.user.address)
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService({serviceDate: date, address, provider: selectedProviderId, price: selectedServicePrice, serviceType, token})  
      await refetch()
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong, please try again")
      console.error("error while creating booking :", error)
    }
  };  
  useEffect(()=> {
    if (getCurrentPosition && useCurrentLocationToFetch) {
      setAddress(getCurrentPosition)
    }
  }, [useCurrentLocationToFetch, getCurrentPosition])

  const fetchCurrentLocationHandler = ()=> {
    if (useCurrentLocationToFetch) {
      setAddress('')
    }
    setUseCurrentLocationToFetch(!useCurrentLocationToFetch)
  }
  useEffect(()=> {
    if (isBookServiceSuccess) {
      toast.dismiss('loading')
      refetch()
      navigate("/user/booking-finished");
    }
    if (isBookServiceLoading) {
      toast.loading("Booking service...", {toastId: 'loading'})
    }
    if (bookServiceError) {
      toast.dismiss('loading')
      toast.error(bookServiceError?.data?.message || "Something went wrong, please try again")
      console.error("error while creating booking :", bookServiceError)
    }
  }, [isBookServiceSuccess, isBookServiceLoading])
  return (
      <div className="bg-gray-100 h-screen flex flex-col">
          <div className="flex items-center justify-between p-4">
              <button
                  onClick={() => setBookServicePanel(false)}
                  className="text-xl font-bold text-gray-500">
                  <i className="ri-close-fill"></i>
              </button>
              <h1 className="text-lg font-bold w-full text-center mr-8">Book a service</h1>
          </div>
          {
            isLoading ? (
              <div className="wfull h-full flex items-center justify-center">
                <CircularProgress />
              </div>
            ): (
              <form className="p-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
              </div>
              <DatePickerComponent setDate={setDate}/>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-lg font-semibold">Your address</h4>
                      <AddressSuggestion address={address} setAddress={setAddress} />
                  </div>
                  {
                    useCurrentLocationToFetch && <GetLocation setGetCurrentPosition={setGetCurrentPosition}/>
                  }
                  <button 
                  type="button"
                  onClick={fetchCurrentLocationHandler}
                  className={`${useCurrentLocationToFetch ? 'bg-slate-700': 'bg-gray-500' } text-white font-semibold rounded-md text-sm py-3 px-1`}>
                  { useCurrentLocationToFetch ? 'Use custom address' : 'Use current address' }
                  </button>
              <button
                  type="submit"
                  className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg mt-5">
                  Confirm booking
              </button>
          </form>
            )
          }
          
      </div>
  );
};

export default BookService;
