import React from 'react';


const AboutCategoryView = () => {
  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-lg font-medium mb-6">About Bookify</h3>
      
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <div className="flex items-start mb-6">
          <div className="w-16 h-16 rounded-lg bg-cyan-400 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Our Mission</h4>
            <p className="text-gray-600">
              Bookify aims to connect professionals with clients seamlessly across various service industries. 
              Our platform makes it easy to find, book, and manage appointments with service providers.
            </p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="w-16 h-16 rounded-lg bg-cyan-400 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">How It Works</h4>
            <p className="text-gray-600">
              Browse through our curated list of professionals, filter by category and specialization, 
              view availability, and book appointments directly through our platform. 
              Manage all your bookings in one place.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-16 h-16 rounded-lg bg-cyan-400 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Join Our Community</h4>
            <p className="text-gray-600">
              Whether you're a service provider looking to grow your client base or a customer seeking 
              quality services, Bookify provides a trusted platform for both. Join our growing community today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AboutCategoryView;