// Service.jsx
import React, { useState } from 'react';
import Navigation from "../../components/ui/navigation";

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const services = [
    {
      id: 1,
      name: "Standard Consultation",
      duration: "30 min",
      price: "$50",
      description: "A brief consultation to discuss your needs and provide initial recommendations.",
      availability: "Mon-Fri"
    },
    {
      id: 2,
      name: "Premium Service",
      duration: "60 min",
      price: "$100",
      description: "A comprehensive service including detailed analysis and personalized solutions.",
      availability: "Mon-Sat"
    },
    {
      id: 3,
      name: "Executive Package",
      duration: "90 min",
      price: "$150",
      description: "Our most extensive service option with priority scheduling and follow-up support.",
      availability: "7 days a week"
    },
    {
      id: 4,
      name: "Quick Check",
      duration: "15 min",
      price: "$25",
      description: "A brief check-in for existing clients with simple questions or updates.",
      availability: "Mon-Fri"
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setBookingStep(2);
    setBookingSuccess(false);
  };

  const handleDateTimeSubmit = (e) => {
    e.preventDefault();
    setBookingStep(3);
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // Simulate booking submission
    setTimeout(() => {
      setBookingSuccess(true);
      // Reset form after successful booking
      setBookingDate("");
      setBookingTime("");
      setBookingName("");
      setBookingEmail("");
      setBookingPhone("");
    }, 1000);
  };

  const handleReset = () => {
    setSelectedService(null);
    setBookingStep(1);
    setBookingSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <Navigation /> 
      <section className= "bg-cyan-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
        
        {bookingStep === 1 && (
          <div>
            <p className="text-gray-600 mb-6">
              Select from our range of professional services to book your appointment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h2>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Available: {service.availability}</span>
                    <button 
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceSelect(service);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {bookingStep === 2 && selectedService && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Book {selectedService.name}</h2>
            <p className="text-gray-600 mb-4">Duration: {selectedService.duration} | Price: {selectedService.price}</p>
            
            <form onSubmit={handleDateTimeSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    id="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">Select Time</label>
                  <select
                    id="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button" 
                  onClick={handleReset}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Back to Services
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}
        
        {bookingStep === 3 && selectedService && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {!bookingSuccess ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                <p className="text-gray-600 mb-4">
                  {selectedService.name} | {bookingDate} at {bookingTime}
                </p>
                
                <form onSubmit={handlePersonalInfoSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button" 
                      onClick={() => setBookingStep(2)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Complete Booking
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Your appointment for {selectedService.name} on {bookingDate} at {bookingTime} has been scheduled.
                </p>
                <p className="text-gray-600 mb-6">
                  A confirmation email has been sent to {bookingEmail}.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Book Another Service
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Service;