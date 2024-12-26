import React, { useContext, useEffect, useState } from "react";
import DatePickerComponent from "./DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from '../app/api/api.js'

const BookService = ({...props}) => {
    
  const [serviceType, setServiceType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [isAddressEdit, setIsAddressEdit] = useState(false);

  const { isLoading, data } = useGetUserQuery()
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
   
    if (data?.address) {
      setAddress(data.address);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullAddress = address.toString();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/booking`, 
        {
          serviceDate: startDate, 
          address: fullAddress,
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
              onClick={() => props.setBookServicePanel(false)}
              className="flex items-center justify-between p-4">
              <button className="text-xl font-bold text-gray-500">
                  <i className="ri-close-fill"></i>
              </button>
              <h1 className="text-lg font-bold">Book a service</h1>
              <div></div>
          </div>

          <form className="p-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                  <select
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
                  <button
                      type="button"
                      className="bg-gray-300 text-white px-2 font-semibold rounded-md mb-2"
                      onClick={() => setIsAddressEdit(!isAddressEdit)}>
                      Edit
                  </button>
                  <textarea
                      disabled={!isAddressEdit}
                      value={address}
                      defaultValue={data.address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className={`w-full resize-none p-4 bg-gray-200 rounded-lg focus:outline-none placeholder:${
                          isAddressEdit ? "text-black" : "text-gray-500"
                      }`}
                  />
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
