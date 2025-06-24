import React, { useState, useEffect } from 'react';

const ClientBookingPage1 = ({ serviceData, onBack }) => {
  // Add default value for serviceData
  const data = serviceData || {
    workingDays: {},
    address: {},
    providerName: '',
    specialty: '',
    qualification: '',
    contactNumber: '',
    workplace: '',
    workHours: { start: '09:00', end: '17:00' },
    timePackages: 4
  };

  // State for calendar and booking
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Function to check if a day is a working day
  const isWorkingDay = (date) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = daysOfWeek[date.getDay()];
    return data.workingDays[dayName];
  };

  // Function to generate time slots based on working hours and time packages
  const generateTimeSlots = (date) => {
    if (!date || !isWorkingDay(date)) return [];

    const startTime = data.workHours?.start || '09:00';
    const endTime = data.workHours?.end || '17:00';
    const timePackages = data.timePackages || 4;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const totalMinutes = endMinutes - startMinutes;
    const slotDuration = Math.floor(totalMinutes / timePackages);

    const slots = [];
    for (let i = 0; i < timePackages; i++) {
      const slotStartMinutes = startMinutes + (i * slotDuration);
      const slotEndMinutes = slotStartMinutes + slotDuration;

      const slotStartHour = Math.floor(slotStartMinutes / 60);
      const slotStartMin = slotStartMinutes % 60;
      const slotEndHour = Math.floor(slotEndMinutes / 60);
      const slotEndMin = slotEndMinutes % 60;

      const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      const slotStart = formatTime(slotStartHour, slotStartMin);
      const slotEnd = formatTime(slotEndHour, slotEndMin);

      slots.push({
        id: i,
        time: `${slotStart} - ${slotEnd}`,
        available: true // You can add availability logic here
      });
    }

    return slots;
  };

  // Update time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate]);

  // Next and previous month navigation
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Calendar generation
  const renderCalendar = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const rows = [];
    let days = [];
    let day = startDate;

    // Days of week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Format the month name
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const monthName = monthFormatter.format(currentMonth);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = cloneDay.toDateString() === new Date().toDateString();
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();
        const isSelected = selectedDate && cloneDay.toDateString() === selectedDate.toDateString();
        const isAvailable = isWorkingDay(cloneDay) && isCurrentMonth;

        days.push(
          <div
            key={cloneDay.toString()}
            className={`p-2 border text-center cursor-pointer ${
              isToday ? 'bg-blue-100' : ''
            } ${isCurrentMonth ? '' : 'text-gray-300'} ${
              isSelected ? 'bg-blue-500 text-white' : ''
            } ${isAvailable ? 'hover:bg-blue-50' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => isAvailable && setSelectedDate(cloneDay)}
          >
            {cloneDay.getDate()}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{monthName} {currentMonth.getFullYear()}</h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              &lt;
            </button>
            <button onClick={nextMonth} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {daysOfWeek.map(day => (
            <div key={day} className="bg-gray-100 text-center py-1 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="bg-gray-200 gap-px">
          {rows}
        </div>
      </div>
    );
  };

  // Render time slots
  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const formattedDate = dateFormatter.format(selectedDate);

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Available Time Slots for {formattedDate}</h3>
        {availableTimeSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimeSlots.map(slot => (
              <div
                key={slot.id}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`p-3 border rounded-md text-center cursor-pointer ${
                  selectedTimeSlot && selectedTimeSlot.id === slot.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                {slot.time}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No available time slots for this date.</p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Booking Information</h1>
        <button 
          onClick={onBack} 
          className="py-2 px-4 bg-gray-100 rounded hover:bg-gray-200"
        >
          Back to Provider Setup
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Provider Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Provider Name:</span> {data.providerName || 'Not specified'}</p>
              <p><span className="font-medium">Specialty:</span> {data.specialty || 'Not specified'}</p>
              <p><span className="font-medium">Qualification:</span> {data.qualification || 'Not specified'}</p>
              <p><span className="font-medium">Workplace:</span> {data.workplace || 'Not specified'}</p>
              <p><span className="font-medium">Contact Number:</span> {data.contactNumber || 'Not specified'}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Location Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Clinic/Location:</span> {data.address.clinic || 'Not specified'}</p>
              <p><span className="font-medium">District:</span> {data.address.district || 'Not specified'}</p>
              <p><span className="font-medium">County/City:</span> {data.address.county || 'Not specified'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Days</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(data.workingDays).map((day) => (
              <div 
                key={day}
                className={`py-2 px-4 rounded-md ${
                  data.workingDays[day] 
                    ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
          <p className="bg-blue-50 p-3 rounded-md inline-block">
            {data.workHours?.start || '09:00'} - {data.workHours?.end || '17:00'}
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
        <p className="mb-4">Please select a date and time slot for your appointment:</p>
        
        {renderCalendar()}
        {renderTimeSlots()}
        
        {selectedTimeSlot && (
          <div className="mt-6">
            <button 
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Book Appointment for {selectedDate?.toDateString()} at {selectedTimeSlot.time}
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Client Booking Instructions</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <ol className="list-decimal list-inside space-y-2">
            <li>Select an available date in the calendar (highlighted dates)</li>
            <li>Choose a time slot from the available options</li>
            <li>Click the "Book Appointment" button to confirm your selection</li>
            <li>Provide your personal details when prompted</li>
            <li>Wait for confirmation from the provider</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ClientBookingPage1;