import React, { useContext, useEffect, useState } from "react";
import DatePickerComponent from "./DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../app/api/api.js'

const BookService = ({...props}) => {
    
  const [serviceType, setServiceType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [isAddressEdit, setIsAddressEdit] = useState(false);

  const { isLoading, data } = useGetUserQuery()
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
   
    if (data?.user.address) {
      setCity(data?.user.address.city || '');
      setLocality(data?.user.address.locality || '');
      setStreet(data?.user.address.street || '');
      setNumber(data?.user.address.number || '');
    }
  }, [data]);
  console.log();
  

  if (isLoading) {
    return <div>Loading...</div>;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = `${city}, ${locality}, ${street}, ${number}`
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/booking`, 
        {
          serviceDate: startDate, 
          address,
          serviceType, 
        }, 
        { 
          withCredentials: true, 
          headers: {
          'Authorization': `Bearer ${token}`
        } });
    if (response.status === 201) {
      navigate("/home");
    }
    } catch (error) {
      console.error("error while creating booking :", error)
    }
  };

  return (
      <div className="bg-gray-100 h-screen flex flex-col">
          <div
              className="flex items-center justify-between p-4">
              <button onClick={() => props.setBookServicePanel(false)} className="text-xl font-bold text-gray-500">
                  <i className="ri-close-fill"></i>
              </button>
              <h1 className="text-lg font-bold">Book a service</h1>
              <div></div>
          </div>

          <form className="p-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                  <select
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full p-4 bg-gray-200 rounded-lg font-semibold focus:outline-none appearance-none">
                      <option value="">Select service type</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Carpenter">Carpenter</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <i className="text-4xl ri-arrow-drop-down-fill"></i>
                  </div>
              </div>
              <div>
                  <DatePickerComponent
                      startDate={startDate}
                      setStartDate={setStartDate}
                  />
                  <p className="text-sm font-semibold mt-2 text-gray-500">{`Selected date : ${startDate.toDateString()}`}</p>
              </div>
              <div className="">
                <h4 className="text-lg text-right font-semibold">Address</h4>
                  <button
                      type="button"
                      className="bg-blue-600 text-white px-2 font-semibold rounded-md mb-3"
                      onClick={() => setIsAddressEdit(!isAddressEdit)}>
                      {isAddressEdit ? "Done" : "Edit"}
                  </button>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="city" className="text-sm font-semibold">City :</label>
                  <input
                      required
                      type="text"
                      id="city"
                      disabled={!isAddressEdit}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter your city"
                      className={`w-full p-4 bg-gray-200 rounded-lg focus:outline-none placeholder:${
                          isAddressEdit ? "text-black" : "text-gray-400"
                      }`}
                  />
                  <label htmlFor="locality" className="text-sm font-semibold">Locality :</label>
                  <input
                      required
                      type="text"
                      id="locality"
                      disabled={!isAddressEdit}
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Enter your locality"
                      className={`w-full p-4 bg-gray-200 rounded-lg focus:outline-none placeholder:${
                          isAddressEdit ? "text-blue-600" : "text-gray-400"
                      }`}
                  />
                  <label htmlFor="street" className="text-sm font-semibold">Street :</label>
                    <input
                        required
                      type="text"
                      id="street"
                      disabled={!isAddressEdit}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Enter your street name"
                      className={`w-full p-4 bg-gray-200 rounded-lg focus:outline-none placeholder:${
                          isAddressEdit ? "text-blue-600" : "text-gray-400"
                      }`}
                  />
                  <label htmlFor="mobile" className="text-sm font-semibold">Mobile :</label>
                    <input
                        required
                      type="number"
                      id="mobile"
                      disabled={!isAddressEdit}
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Enter your mobile number"
                      className={`w-full p-4 bg-gray-200 rounded-lg focus:outline-none placeholder:${
                          isAddressEdit ? "text-blue-600" : "text-gray-400"
                      }`}
                  />
                  </div>
              </div>
              <button
                  type="submit"
                  className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg">
                  Confirm booking
              </button>
          </form>
      </div>
  );
};

export default BookService;
