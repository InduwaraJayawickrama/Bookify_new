import React, { useState } from 'react';

const BookingService = () => {
  const [bookingSettings, setBookingSettings] = useState({
    allowInstantBooking: true,
    requireApproval: false,
    bufferTime: 15,
    minNotice: 60,
    maxAdvance: 30,
    cancellationPolicy: 'moderate',
    autoDecline: false,
    sendReminders: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Booking Service Settings</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium mb-4">Booking Preferences</h3>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  name="allowInstantBooking"
                  checked={bookingSettings.allowInstantBooking}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-500 mr-2"
                />
                <span>Allow Instant Booking</span>
              </label>
              <p className="text-gray-500 text-sm ml-7">
                Clients can book available slots without your approval
              </p>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  name="requireApproval"
                  checked={bookingSettings.requireApproval}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-500 mr-2"
                />
                <span>Require Approval for Bookings</span>
              </label>
              <p className="text-gray-500 text-sm ml-7">
                All booking requests must be approved by you
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Buffer Time Between Bookings (minutes)</label>
              <input 
                type="number"
                name="bufferTime"
                value={bookingSettings.bufferTime}
                onChange={handleChange}
                min="0"
                max="120"
                className="w-full border rounded-md p-2"
              />
              <p className="text-gray-500 text-sm">
                Extra time between appointments to prepare
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Scheduling Limits</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Minimum Notice Required (minutes)</label>
              <input 
                type="number"
                name="minNotice"
                value={bookingSettings.minNotice}
                onChange={handleChange}
                min="0"
                className="w-full border rounded-md p-2"
              />
              <p className="text-gray-500 text-sm">
                How far in advance clients must book
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Maximum Advance Booking (days)</label>
              <input 
                type="number"
                name="maxAdvance"
                value={bookingSettings.maxAdvance}
                onChange={handleChange}
                min="1"
                max="365"
                className="w-full border rounded-md p-2"
              />
              <p className="text-gray-500 text-sm">
                How far in the future clients can book
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium mb-4">Cancellation Policy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${bookingSettings.cancellationPolicy === 'flexible' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setBookingSettings(prev => ({ ...prev, cancellationPolicy: 'flexible' }))}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">Flexible</span>
                {bookingSettings.cancellationPolicy === 'flexible' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Full refund if canceled up to 2 hours before appointment
              </p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${bookingSettings.cancellationPolicy === 'moderate' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setBookingSettings(prev => ({ ...prev, cancellationPolicy: 'moderate' }))}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">Moderate</span>
                {bookingSettings.cancellationPolicy === 'moderate' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Full refund if canceled at least 24 hours before appointment
              </p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${bookingSettings.cancellationPolicy === 'strict' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setBookingSettings(prev => ({ ...prev, cancellationPolicy: 'strict' }))}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">Strict</span>
                {bookingSettings.cancellationPolicy === 'strict' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-600">
                50% refund if canceled 48 hours before, no refund after that
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-medium mb-4">Additional Settings</h3>
          
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                name="autoDecline"
                checked={bookingSettings.autoDecline}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 mr-2"
              />
              <span>Auto-decline bookings when you're unavailable</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                name="sendReminders"
                checked={bookingSettings.sendReminders}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 mr-2"
              />
              <span>Send automatic appointment reminders to clients</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
            Save Booking Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingService;