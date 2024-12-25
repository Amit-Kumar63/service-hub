import React, { useState } from "react";
import DatePickerComponent from "./DatePicker";

const BookService = ({...props}) => {
    
  const [serviceType, setServiceType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [address, setAddress] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      
      <div onClick={()=> props.setBookServicePanel(false)} className="flex items-center justify-between p-4">
        <button className="text-xl font-bold text-gray-500"><i className="ri-close-fill"></i></button>
        <h1 className="text-lg font-bold">Book a service</h1>
        <div></div> {/* Empty div for symmetry */}
      </div>

      
      <form className="p-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter service details"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none"
          >
          </input>

        <div>
          <DatePickerComponent startDate={startDate} setStartDate={setStartDate} />
          <p className="text-sm font-semibold mt-2 text-gray-500">{`Selected date : ${startDate.toDateString()}`}</p>
        </div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full resize-none p-4 bg-gray-200 rounded-lg focus:outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white font-bold rounded-lg"
        >
          Find pros
        </button>
      </form>
    </div>
  );
};

export default BookService;
