import React, { useState } from 'react';
import Navigation from "../../components/ui/navigation";


// IMAGE 3: Account settings and profile page
const Account1 = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mt-6 mb-6">Account Settings</h1>
        
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            <div className="bg-blue-100 p-3 rounded text-blue-700 font-medium mb-2">MY Profile</div>
            <div className="p-3 text-gray-600 mb-2">Service Details</div>
            <div className="p-3 text-gray-600 mb-2">Notifications</div>
            <div className="p-3 text-gray-600 mb-2">My Booking</div>
            <div className="p-3 text-gray-600 mb-2">Security</div>
            <div className="p-3 text-gray-600 mb-2">Reset Password</div>
            <div className="p-3 text-red-600 mt-12">Delete account</div>
          </div>
          
          {/* Main content */}
          <div className="w-3/4">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            
            {/* Profile section */}
            <div className="border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-gray-600">Name : abc...</p>
                    <p className="text-gray-600">bio : abc...</p>
                  </div>
                </div>
                <button className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
            
            {/* Personnel information section */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-lg">Personnel information</h3>
                <button className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">First Name</p>
                  <p className="font-medium">Thilina</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Name</p>
                  <p className="font-medium">Thilina</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">E-mail</p>
                  <p className="font-medium">Thilina@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tel No:</p>
                  <p className="font-medium">07*******</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bio</p>
                  <p className="font-medium">Student</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Address</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Country</p>
                    <p className="font-medium">asd</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">District</p>
                    <p className="font-medium">qwe</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">City</p>
                    <p className="font-medium">aln</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Postal code:</p>
                    <p className="font-medium">*****</p>
                  </div>
                </div>
                <button className="flex items-center text-gray-600 mt-2">
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account1;