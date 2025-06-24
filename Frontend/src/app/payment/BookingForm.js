import React, { useState } from 'react';
import Navigation from "../../components/ui/navigation";
import image1 from "../../../src/images/14ac423b-f383-4ab5-b624-4fb57e99b7ef.webp";

const BookingForm = ({ bookingDetails, onSelectPaymentMethod }) => {
  const [activeSection, setActiveSection] = useState('details');

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Navigation />
      <div className="flex items-center justify-center">
        <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${image1})` }}
          ></div>
      </div>

      {/* Right Column - Form */}
      <div className="space-y-6">
        {activeSection === 'details' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Doctor Appointment</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <div className="text-blue-600 text-sm font-medium mb-2">Please confirm the summary info</div>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Doctor Name:</span> {bookingDetails.doctorName}</div>
                  <div><span className="font-medium">Doctor ID:</span> {bookingDetails.doctorId}</div>
                  <div><span className="font-medium">Degree:</span> {bookingDetails.degree}</div>
                  <div><span className="font-medium">Qualification:</span> {bookingDetails.qualification}</div>
                  <div><span className="font-medium">Service Area:</span> {bookingDetails.serviceArea}</div>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveSection('payment')}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 px-6 rounded-full transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {activeSection === 'payment' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-md text-gray-600 text-sm">
                Choose your payment method
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onSelectPaymentMethod('card')}
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <svg className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="font-medium">Card Payment</span>
                </button>
                
                <button 
                  onClick={() => onSelectPaymentMethod('cash')}
                  className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <svg className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="font-medium">Cash Payment</span>
                </button>
              </div>
              
              <div className="bg-white p-4 border border-gray-200 rounded-md mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-xl font-bold">{bookingDetails.amount}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveSection('details')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-full transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;