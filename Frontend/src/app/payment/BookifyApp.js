import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "../../components/ui/navigation";
import image1 from "../../images/2.png";

// BookingForm Component
const BookingForm = ({ bookingDetails, onSelectPaymentMethod }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Doctor Appointment</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-blue-500 font-medium mb-4">Please confirm the summary info</h3>
        
        <div className="space-y-2">
          <div className="flex">
            <span className="font-medium w-32">Doctor Name:</span>
            <span>{bookingDetails.doctorName}</span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-32">Qualification:</span>
            <span>{bookingDetails.qualification}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Address:</span>
            <span>{bookingDetails.serviceArea}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-blue-500 font-medium mb-4">Select Payment Method</h3>
        
        <div className="space-y-3">
          <button
            onClick={() => onSelectPaymentMethod('card')}
            className="w-full border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 p-4 rounded-lg flex items-center transition-colors"
          >
            <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded mr-3">
              <svg className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V8H18V14ZM18 4H2V2H18V4Z" />
              </svg>
            </div>
            <span className="font-medium">Pay with Card</span>
          </button>
          
          <button
            onClick={() => onSelectPaymentMethod('cash')}
            className="w-full border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 p-4 rounded-lg flex items-center transition-colors"
          >
            <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded mr-3">
              <svg className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                <path d="M2 0C0.89 0 0 0.89 0 2V14C0 14.5304 0.21071 15.0391 0.58579 15.4142C0.96086 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 0.89 19.1 0 18 0H2ZM11 14H2V8H11V14ZM18 14H13V8H18V14ZM18 6H2V2H18V6Z" />
              </svg>
            </div>
            <span className="font-medium">Pay with Cash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// CardPayment Component
const CardPayment = ({ cardDetails, onBack, onComplete, amount }) => {
  const [saveCard, setSaveCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [useNewCard, setUseNewCard] = useState(cardDetails.savedCards.length === 0);
  
  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
    setUseNewCard(false);
  };
  
  const handleUseNewCard = () => {
    setSelectedCard(null);
    setUseNewCard(true);
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Image */}
      <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
        <div className="w-full max-w-md">
          <img 
            src={image1} 
            alt="Payment illustration"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
  
      {/* Right Column - Card Payment */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Card Payment</h2>
          
          {/* Saved Cards */}
          {cardDetails.savedCards.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Cards</h3>
              <div className="space-y-3">
                {cardDetails.savedCards.map(card => (
                  <div 
                    key={card.id} 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedCard === card.id 
                        ? 'border-cyan-400 bg-cyan-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCardSelect(card.id)}
                  >
                    <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded mr-3">
                      {card.icon === 'visa' ? 'VISA' : 'MC'}
                    </div>
                    <div className="text-sm flex-grow">{card.lastFour}</div>
                    {selectedCard === card.id && (
                      <svg className="h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
                
                <div 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    useNewCard 
                      ? 'border-cyan-400 bg-cyan-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={handleUseNewCard}
                >
                  <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Use a new card</div>
                  {useNewCard && (
                    <svg className="h-5 w-5 text-cyan-500 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Card Form - Only shown when using a new card */}
          {useNewCard && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  id="save-card"
                  type="checkbox"
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                  className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-gray-300 rounded"
                />
                <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                  Save this card for future payments
                </label>
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <div className="bg-blue-50 p-3 rounded-md text-center mb-4">
              <span className="text-lg font-bold">{amount}</span>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <button
              onClick={onComplete}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 px-6 rounded-full transition-colors"
            >
              {selectedCard ? 'Pay with Selected Card' : 'Pay Now'}
            </button>
            
            <button
              onClick={onBack}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-full transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// CashPayment Component
const CashPayment = ({ onBack, onComplete, amount }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Image */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <img 
            src="/api/placeholder/600/500" 
            alt={image1}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
  
      {/* Right Column - Cash Payment */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cash Payment</h2>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="text-center">
              <svg className="h-16 w-16 mx-auto mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Pay at the Clinic</h3>
              <p className="text-gray-600 mb-4">Please pay the amount in cash when you arrive for your appointment.</p>
              <div className="bg-blue-50 p-3 rounded-md inline-block">
                <span className="text-lg font-bold">{amount}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please arrive 15 minutes before your appointment with the exact amount.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={onComplete}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-3 px-6 rounded-full transition-colors"
            >
              Confirm Booking
            </button>
            
            <button
              onClick={onBack}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-full transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Confirmation Component
const PaymentConfirmation = ({ paymentMethod, bookingDetails, onNewBooking }) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment with {bookingDetails.doctorName} has been successfully booked and confirmed.
          {paymentMethod === 'card' 
            ? ' Your payment has been processed successfully.' 
            : ' Please remember to bring cash payment to your appointment.'}
        </p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
          <h3 className="font-medium mb-2">Booking Details:</h3>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Doctor:</span> {bookingDetails.doctorName}</div>
            <div><span className="font-medium">Specialization:</span> {bookingDetails.qualification}</div>
            <div><span className="font-medium">Location:</span> {bookingDetails.serviceArea}</div>
            <div><span className="font-medium">Amount:</span> {bookingDetails.amount}</div>
            <div><span className="font-medium">Payment Method:</span> {paymentMethod === 'card' ? 'Card Payment' : 'Cash Payment'}</div>
          </div>
        </div>
        
        <button
          onClick={onNewBooking}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
};

// Main BookifyApp Component
const BookifyApp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('booking');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    doctorName: 'Dr. John Smith',
    doctorId: '1',
    qualification: 'Doctor',
    serviceArea: '123 Main St',
    amount: '$50'
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savedCards: [
      { id: 1, lastFour: '******4578', icon: 'visa' },
      { id: 2, lastFour: '******7890', icon: 'master' }
    ]
  });

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setCurrentStep(method === 'card' ? 'cardPayment' : 'cashPayment');
  };

  const handleCardPaymentComplete = () => {
    setCurrentStep('confirmation');
  };

  const handleCashPaymentComplete = () => {
    setCurrentStep('confirmation');
  };

  const handleBackToBooking = () => {
    setCurrentStep('booking');
    setPaymentMethod(null);
  };

  const handleNewBooking = () => {
    setCurrentStep('booking');
    setPaymentMethod(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden relative my-8">
        <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-8 rounded-3xl">
          {currentStep === 'booking' && (
            <BookingForm 
              bookingDetails={bookingDetails} 
              onSelectPaymentMethod={handlePaymentMethodSelect}
            />
          )}
          
          {currentStep === 'cardPayment' && (
            <CardPayment 
              cardDetails={cardDetails}
              onBack={handleBackToBooking}
              onComplete={handleCardPaymentComplete}
              amount={bookingDetails.amount}
            />
          )}
          
          {currentStep === 'cashPayment' && (
            <CashPayment 
              onBack={handleBackToBooking}
              onComplete={handleCashPaymentComplete}
              amount={bookingDetails.amount}
            />
          )}
          
          {currentStep === 'confirmation' && (
            <PaymentConfirmation 
              paymentMethod={paymentMethod}
              bookingDetails={bookingDetails}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { BookingForm, CardPayment, CashPayment, PaymentConfirmation };
export default BookifyApp;