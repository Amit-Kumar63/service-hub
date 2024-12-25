import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({...props}) => {
  
  return (
    <div className="w-full flex items-center gap-5">
        <DatePicker
    className="w-full p-4 px-6 bg-gray-200 rounded-lg font-semibold focus:outline-none"
    selected={props.startDate}
    onChange={(date) => props.setStartDate(date)} />
    <i className="text-4xl p-2 bg-gray-200 rounded-lg ri-calendar-2-line"></i>
    </div>
  );
};

export default DatePickerComponent;