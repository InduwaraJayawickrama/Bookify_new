import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../images/622e4649-090b-4f8f-bee7-9c607d3f8732.webp"; // Replace with actual image path
import Button from "../../components/ui/button";
const SignUp1 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    nic: "",
    tel1: "",
    tel2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 py-5">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}></div>

        <div className="w-full md:w-1/2 p-2 flex flex-col items-center bg-teal-100">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="p-2 rounded-lg shadow-md bg-white">
                <label className="text-left block text-gray-700">First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />

                <label className="text-left block text-gray-700 mt-4">Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />

                <label className="text-left block text-gray-700 mt-4">Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />

                <label className="text-left block text-gray-700 mt-4">NIC:</label>
                <input type="text" name="nic" value={formData.nic} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />

                <label className="text-left block text-gray-700 mt-4">Tel No 1:</label>
                <input type="text" name="tel1" value={formData.tel1} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />

                <label className="text-left block text-gray-700 mt-4">Tel No 2:</label>
                <input type="text" name="tel2" value={formData.tel2} onChange={handleChange} className="w-full p-1 border rounded mt-2" required />
            <Link to="/login">
              <Button className="w-[30%] mt-6 py-1 items-center text-center bg-cyan-500 text-white rounded hover:bg-cyan-600">
                Next
              </Button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
