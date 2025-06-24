import React, { useState } from 'react';

const MyBooking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 'DOC-1234',
      type: 'doctor',
      serviceName: 'Dr. Sarah Williams - Cardiology',
      serviceDate: '2025-03-25',
      serviceTime: '10:00 AM',
      status: 'Confirmed',
      amount: 120.00,
      location: 'Central Hospital, Room 302',
      image: '/doctor-placeholder.jpg'
    },
    {
      id: 'TCH-5678',
      type: 'teacher',
      serviceName: 'Prof. James Peterson - Mathematics',
      serviceDate: '2025-04-02',
      serviceTime: '3:30 PM',
      status: 'Pending',
      amount: 45.00,
      location: 'Online Session (Zoom)',
      image: '/teacher-placeholder.jpg'
    },
    {
      id: 'FIT-9012',
      type: 'fitness',
      serviceName: 'Coach Michael Brown - Personal Training',
      serviceDate: '2025-03-30',
      serviceTime: '6:00 PM',
      status: 'Confirmed',
      amount: 55.00,
      location: 'FitLife Gym, Studio 5',
      image: '/fitness-placeholder.jpg'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedType, setSelectedType] = useState('all');
  
  const cancelBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Cancelled' } : booking
    ));
  };
  
  // Get appropriate icon based on booking type
  const getBookingTypeIcon = (type) => {
    switch(type) {
      case 'doctor':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'teacher':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'fitness':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.serviceDate);
    const today = new Date();
    
    // Filter by upcoming/past
    const dateFilter = activeTab === 'upcoming' 
      ? bookingDate >= today && booking.status !== 'Cancelled'
      : bookingDate < today || booking.status === 'Cancelled';
    
    // Filter by type  
    const typeFilter = selectedType === 'all' || booking.type === selectedType;
    
    return dateFilter && typeFilter;
  });

  return (
    <div className="bg-cyan-100 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-blue-500">My Booking</h2>
      
      {/* Main tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        <button 
          className={`pb-2 px-4 font-medium text-sm ${activeTab === 'upcoming' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`pb-2 px-4 font-medium text-sm ${activeTab === 'past' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('past')}
        >
          Past & Cancelled
        </button>
      </div>
      
      {/* Type filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`px-4 py-2 text-sm rounded-full ${selectedType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setSelectedType('all')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 text-sm rounded-full ${selectedType === 'doctor' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setSelectedType('doctor')}
        >
          Doctor
        </button>
        <button 
          className={`px-4 py-2 text-sm rounded-full ${selectedType === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setSelectedType('teacher')}
        >
          Teacher
        </button>
        <button 
          className={`px-4 py-2 text-sm rounded-full ${selectedType === 'fitness' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setSelectedType('fitness')}
        >
          Fitness Coach
        </button>
      </div>
      
      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="md:flex">
                <div className="md:w-1/4 bg-gray-100">
                  <img 
                    src={booking.image} 
                    alt={booking.serviceName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {getBookingTypeIcon(booking.type)}
                      <h3 className="font-medium text-lg ml-2">{booking.serviceName}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mt-1">{booking.location}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Booking ID</p>
                      <p className="font-medium">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date & Time</p>
                      <p className="font-medium">{booking.serviceDate} at {booking.serviceTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-medium">${booking.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                      View Details
                    </button>
                    {booking.status !== 'Cancelled' && activeTab === 'upcoming' && (
                      <button 
                        onClick={() => cancelBooking(booking.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.type === 'teacher' && booking.status === 'Confirmed' && activeTab === 'upcoming' && (
                      <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                        Join Session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-gray-500">No {activeTab} bookings found</p>
        </div>
      )}
    </div>
  );
};

export default MyBooking;