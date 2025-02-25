import React, { useState } from "react";
import ImageIcon from '@mui/icons-material/BrokenImage';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const AddService = ({setAddServicePanel, setValue}) => {
  const { providerToken: token } = useOutletContext()
  const [formData, setFormData] = useState({
    serviceType: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/service/create-service`, {
      serviceType: formData.serviceType,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 201) {
      console.log("Service added successfully");
      setFormData({
        serviceType: "",
        price: "",
        description: "",
        image: "",
      })
      console.log(response.data);
      setAddServicePanel(false);
      setValue(0);

    }
  };

  return (
    <div className="bg-gray-100 h-full pt-3 border border-t border-gray-200 shadow-md">
        <h1 onClick={() => {setAddServicePanel(false); setValue(0)}} className="text-center w-full"><ArrowDownIcon sx={{ fontSize: 30, color: '#dadada' }}/></h1>
      <h1 className="text-xl text-center font-bold text-gray-800 mb-4">Add New Service</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded space-y-4 mb-16"
      >

        {/* Service Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Service Type
          </label>
          <input
            type="text"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="e.g., Plumber, Electrician"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description: (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="text-gray-700 font-semibold mb-1 w-full flex items-center gap-7">
            Upload Image:
          <ImageIcon sx={{fontSize: 80, color: '#acacac'}}/>
          </label>
          <input
          required
            type="file"
            accept="image/*"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full hidden border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
