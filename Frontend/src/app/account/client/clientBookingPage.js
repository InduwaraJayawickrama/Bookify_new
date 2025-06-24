import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const ClientBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const userData = JSON.parse(localStorage.getItem('userInfo'));
  // State for calendar and booking
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Helper function to format time from datetime string
  const formatTimeFromDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return null;
    
    try {
      const date = new Date(dateTimeStr);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (err) {
      console.error("Failed to parse datetime:", err);
      return null;
    }
  };

  // Extract client ID and provider ID from URL when component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    //const cid = params.get("client");
    const pid = params.get("provider");
    
    /*if (cid) {
      setClientId(cid);
    } else {
      setError("Client ID not found in URL");
    }*/
    
    if (pid) {
      setProviderId(pid);
    } else {
      setError("Provider ID not found in URL");
    }
  }, [location]);

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    return date < today;
  };

  // Fetch clientId from localStorage when the component mounts
  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");

    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      // If no clientId, redirect to login
      //navigate("/login");
    }
  }, []);

  // Fetch selected provider details
  useEffect(() => {
    const fetchProviderDetails = async () => {
      if (!providerId) return;

      setLoading(true);
      try {
        // Fetch specific provider details using the endpoint
        const providerDetailsResponse = await axios.get(
          `http://localhost:8081/api/booking/provider/${providerId}/details`
        );
        
        // Fetch provider datetime information
        const datetimeResponse = await axios.get(
          `http://localhost:8081/api/booking/service-datetime/${providerId}`
        );

        const bookedDatetimeResponse = await axios.get(
          `http://localhost:8081/api/booking/provider/${providerId}`
        );
        
        const providerInfo = providerDetailsResponse.data;
        const datetimeInfo = datetimeResponse.data;
        const bookedDatetimeInfo = bookedDatetimeResponse.data;
        
        console.log("Provider details:", providerInfo);
        console.log("DateTime info:", datetimeInfo);
        console.log("Booked datetime info:", bookedDatetimeInfo);

        if (!providerInfo) {
          throw new Error("Provider information not found");
        }

        // Parse working days JSON string
        let workingDays = { 
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        };
        
        try {
          if (datetimeInfo[0].workingDays) {
            const parsedWorkingDays = JSON.parse(datetimeInfo[0].workingDays);
            
            // Fix the casing and potential duplicate keys
            workingDays = {
              monday: parsedWorkingDays.Monday === true,
              tuesday: parsedWorkingDays.Tuesday === true,
              wednesday: parsedWorkingDays.Wednesday === true,
              thursday: parsedWorkingDays.Thursday === true, // There's a duplicate Thursday in the API response
              friday: parsedWorkingDays.Friday === true,
              saturday: false,
              sunday: parsedWorkingDays.Sunday === true // API returns Sunday as false
            };
          }
        } catch (err) {
          console.error("Failed to parse working days:", err);
        }

        // Handle work hours - fix the reversed start/end times
        let startTime = "09:00";
        let endTime = "17:00";
        
        if (datetimeInfo[0].workHoursStart && datetimeInfo[0].workHoursEnd) {
          const start = formatTimeFromDateTime(datetimeInfo[0].workHoursStart);
          const end = formatTimeFromDateTime(datetimeInfo[0].workHoursEnd);
          
          if (start && end) {
            // API data has start time (17:00) later than end time (11:00)
            // We'll swap them to correct the logical error
            startTime = start; // Use 11:00 as start
            endTime = end; // Use 17:00 as end
          }
        }
        
        // Format provider data
        const formattedData = {
          providerName: `${providerInfo.firstName || ''} ${providerInfo.lastName || ''}`.trim() || providerInfo.username || "-",
          specialty: providerInfo.services?.[0]?.specialization || "-",
          qualification: providerInfo.experience ? `${providerInfo.experience} years` : "-",
          contactNumber: providerInfo.contact || "-",
          workplace: providerInfo.address || "-",
          workHours: {
            start: startTime,
            end: endTime
          },
          timePackages: datetimeInfo[0].timePackages || 5, // API returns 5 instead of 4
          workingDays: workingDays,
          address: {
            clinic: providerInfo.address || "-",
            district: providerInfo.city || "-",
            county: providerInfo.state || "-",
          },
          serviceId: providerInfo.services?.[0]?.serviceId || null,
          service: providerInfo.services?.[0] || null
        };

        // Store booked slots from bookedDatetimeInfo
        const formattedBookedSlots = bookedDatetimeInfo.map(booking => {
          const bookingDate = new Date(booking.dateTime);
          const formattedTime = formatTimeFromDateTime(booking.dateTime);
          
          // Calculate slot duration for this booking
          const slotDuration = calculateSlotDuration(
            startTime, 
            endTime, 
            datetimeInfo[0].timePackages || 5
          );
          
          const endTimeFormatted = addMinutesToTime(formattedTime, slotDuration);
          
          return {
            date: bookingDate.toISOString().split('T')[0], // YYYY-MM-DD format
            startTime: formattedTime,
            endTime: endTimeFormatted,
            time: `${formattedTime} - ${endTimeFormatted}`,
            scheduleId: booking.scheduleId
          };
        });
        
        setBookedSlots(formattedBookedSlots);
        setServiceData(formattedData);
      } catch (err) {
        console.error("Failed to fetch provider details:", err);
        setError("Failed to fetch provider details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetails();
  }, [providerId]);

  // Helper function to calculate slot duration
  const calculateSlotDuration = (startTime, endTime, timePackages) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const totalMinutes = endMinutes - startMinutes;
    
    return Math.floor(totalMinutes / timePackages);
  };

  // Helper function to add minutes to a time string
  const addMinutesToTime = (timeStr, minutes) => {
    if (!timeStr) return null;
    
    try {
      const [hours, mins] = timeStr.split(':').map(Number);
      let totalMinutes = hours * 60 + mins + minutes;
      
      const newHours = Math.floor(totalMinutes / 60) % 24;
      const newMins = totalMinutes % 60;
      
      return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
    } catch (err) {
      console.error("Failed to add minutes to time:", err);
      return timeStr;
    }
  };

  // Function to check if a day is a working day
  const isWorkingDay = (date) => {
    if (!serviceData || !serviceData.workingDays) return false;

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      
    ];
    const dayName = daysOfWeek[date.getDay()].toLowerCase();
    return serviceData.workingDays[dayName] === true;
  };

  // Function to check if a time slot is already booked
  const isSlotBooked = (date, timeSlot) => {
    if (!bookedSlots || bookedSlots.length === 0) return false;
    
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const slotStartTime = timeSlot.time.split(' - ')[0]; // Extract start time
    
    return bookedSlots.some(booking => {
      // Check if the booking date matches
      if (booking.date !== dateString) return false;
      
      // Parse times as minutes for comparison
      const [bookingStartHour, bookingStartMin] = booking.startTime.split(':').map(Number);
      const [bookingEndHour, bookingEndMin] = booking.endTime.split(':').map(Number);
      const [slotStartHour, slotStartMin] = slotStartTime.split(':').map(Number);
      
      const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;
      const bookingEndMinutes = bookingEndHour * 60 + bookingEndMin;
      const slotStartMinutes = slotStartHour * 60 + slotStartMin;
      
      // Check if the slot start time matches the booking start time exactly
      return slotStartMinutes === bookingStartMinutes;
    });
  };

  // Function to get booking schedule ID if the slot is booked
  const getBookingScheduleId = (date, timeSlot) => {
    if (!bookedSlots || bookedSlots.length === 0) return null;
    
    const dateString = date.toISOString().split('T')[0];
    const slotStartTime = timeSlot.time.split(' - ')[0];
    
    const matchingBooking = bookedSlots.find(booking => {
      if (booking.date !== dateString) return false;
      
      const [bookingStartHour, bookingStartMin] = booking.startTime.split(':').map(Number);
      const [slotStartHour, slotStartMin] = slotStartTime.split(':').map(Number);
      
      const bookingStartMinutes = bookingStartHour * 60 + bookingStartMin;
      const slotStartMinutes = slotStartHour * 60 + slotStartMin;
      
      return slotStartMinutes === bookingStartMinutes;
    });
    
    return matchingBooking ? matchingBooking.scheduleId : null;
  };

  // Function to generate time slots based on working hours and time packages
  const generateTimeSlots = (date) => {
    if (!date || !serviceData || !isWorkingDay(date)) return [];
  
    try {
      const startTime = serviceData.workHours?.start || "09:00";
      const endTime = serviceData.workHours?.end || "17:00";
      const timePackages = serviceData.timePackages || 5;
  
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
  
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      const totalMinutes = endMinutes - startMinutes;
  
      if (totalMinutes <= 0) return [];
  
      const slotDuration = Math.floor(totalMinutes / timePackages);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  
      const slots = [];
      for (let i = 0; i < timePackages; i++) {
        const slotStartMinutes = startMinutes + i * slotDuration;
        const slotEndMinutes = slotStartMinutes + slotDuration;
  
        const slotStartHour = Math.floor(slotStartMinutes / 60);
        const slotStartMin = slotStartMinutes % 60;
        const slotEndHour = Math.floor(slotEndMinutes / 60);
        const slotEndMin = slotEndMinutes % 60;
  
        const formatTime = (h, m) =>
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        const slotStart = formatTime(slotStartHour, slotStartMin);
        const slotEnd = formatTime(slotEndHour, slotEndMin);
  
        const timeSlot = {
          id: i,
          time: `${slotStart} - ${slotEnd}`,
          startTime: slotStart,
          endTime: slotEnd,
          available: true
        };
  
        // Check if this slot is booked
        const isBooked = bookedSlots.some(booking => {
          // Check if booking is for the same date
          if (booking.date !== dateString) return false;
          
          // Convert times to minutes for comparison
          const [bookStartHour, bookStartMin] = booking.startTime.split(':').map(Number);
          const [bookEndHour, bookEndMin] = booking.endTime.split(':').map(Number);
          const bookStartMinutes = bookStartHour * 60 + bookStartMin;
          const bookEndMinutes = bookEndHour * 60 + bookEndMin;
          
          // Check for overlap
          return (
            (slotStartMinutes >= bookStartMinutes && slotStartMinutes < bookEndMinutes) ||
            (slotEndMinutes > bookStartMinutes && slotEndMinutes <= bookEndMinutes) ||
            (slotStartMinutes <= bookStartMinutes && slotEndMinutes >= bookEndMinutes)
          );
        });
  
        timeSlot.available = !isBooked;
        
        // If booked, find the matching booking info
        if (!timeSlot.available) {
          const booking = bookedSlots.find(b => {
            if (b.date !== dateString) return false;
            const [bookStartHour, bookStartMin] = b.startTime.split(':').map(Number);
            const bookStartMinutes = bookStartHour * 60 + bookStartMin;
            return slotStartMinutes === bookStartMinutes;
          });
          
          if (booking) {
            timeSlot.scheduleId = booking.scheduleId;
          }
        }
  
        slots.push(timeSlot);
      }
  
      return slots;
    } catch (err) {
      console.error("Error generating time slots:", err);
      return [];
    }
  };

  // Update time slots when date is selected
  useEffect(() => {
    if (selectedDate && serviceData) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
    }
  }, [selectedDate, serviceData, bookedSlots]);

  // Next and previous month navigation
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  

  // Calendar generation
  const renderCalendar = () => {
    // Helper function to check if a date has any booked slots
    const hasBookedSlots = (date) => {
      if (!bookedSlots || bookedSlots.length === 0) return false;
      const dateString = date.toISOString().split('T')[0];
      return bookedSlots.some(booking => booking.date === dateString);
    };
  
    // Helper function to check if all slots are booked for a date
    const areAllSlotsBooked = (date) => {
      if (!isWorkingDay(date)) return true; // Non-working days are considered fully booked
      const timeSlots = generateTimeSlots(date);
      return timeSlots.length > 0 && timeSlots.every(slot => !slot.available);
    };
  
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
    const rows = [];
    let days = [];
    let day = new Date(startDate);
  
    // Days of week header
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    // Format the month name
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
    const monthName = monthFormatter.format(currentMonth);
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = cloneDay.toDateString() === new Date().toDateString();
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();
        const isSelected = selectedDate && cloneDay.toDateString() === selectedDate.toDateString();
        const isAvailable = isWorkingDay(cloneDay) && isCurrentMonth;
        const allSlotsBooked = areAllSlotsBooked(cloneDay);
        const hasBookings = hasBookedSlots(cloneDay);
        const isWorking = isWorkingDay(cloneDay);
  
        days.push(
          <div
            key={cloneDay.toString()}
            className={`p-2 border text-center ${
              isToday ? "bg-blue-200" : ""
            } ${isCurrentMonth ? "" : "text-gray-400"} ${
              isSelected ? "bg-blue-500 text-white" : ""
            }${
             
                 isWorking ? "" : "bg-blue-200 text-gray-400" 
               
            } ${
              allSlotsBooked && isWorking
                ? "bg-red-200 cursor-not-allowed" 
                : isAvailable && !isPastDate(cloneDay) 
                  ? "cursor-pointer hover:bg-blue-400" 
                  : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              const now = new Date();
              if (isToday && cloneDay < now) {
                return; // Do nothing if it's before the current time
              }
              if (isAvailable && !allSlotsBooked && !isPastDate(cloneDay)) {
                setSelectedDate(cloneDay);
              }
            }}

            

            
          >
            {cloneDay.getDate()}
            {hasBookings && !allSlotsBooked && (
              <div className="text-xs bg-yellow-200 text-white rounded-full mt-1 mx-auto w-4 h-4 flex">
                
              </div>
            )}
            {allSlotsBooked && (
              <div className="text-xs text-red-600 mt-1"></div>
            )}
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
          <h2 className="text-xl font-semibold">
            {monthName} {currentMonth.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className={`p-2 rounded hover:bg-gray-500 ${
                isPastDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
              disabled={isPastDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))}
            >
              &lt;
            </button>
            <button
              onClick={nextMonth}
              className="p-2 bg-gray-100 rounded hover:bg-gray-500"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-black">
          {daysOfWeek.map((day) => (
            <div key={day} className="bg-cyan-200 text-center py-1 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="bg-cyan-300 gap-px">{rows}</div>
        <div className="mt-2 text-sm flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-red-200 mr-2"></div>
            <span>Fully booked days</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-200 rounded-full mr-2"></div>
            <span>Days with some bookings</span>
          </div>
        </div>
      </div>
    );
  };

  // Render time slots
  const renderTimeSlots = () => {
    if (!selectedDate) return null;
  
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const formattedDate = dateFormatter.format(selectedDate);
  
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">
          Available Time Slots for {formattedDate}
        </h3>
        {availableTimeSlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {availableTimeSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => slot.available && setSelectedTimeSlot(slot)}
                className={`p-3 border rounded-md text-center cursor-pointer ${
                  selectedTimeSlot && selectedTimeSlot.id === slot.id
                    ? "bg-blue-500 text-white"
                    : slot.available
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "bg-red-100 text-gray-500 cursor-not-allowed"
                }`}
              >
                {slot.time}
                {!slot.available && (
                  <div className="text-xs mt-1">
                    {slot.scheduleId ? `Booked ` : 'Booked'}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No available time slots for this date.
          </p>
        )}
      </div>
    );
  };

  // Render booked appointments section
  const renderBookedAppointments = () => {
    if (!bookedSlots || bookedSlots.length === 0) return null;

    return (
      <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-red-100 via-red-50 to-pink-100">
        <h2 className="text-xl font-semibold mb-4">Currently Booked Appointments</h2>
        <div className="space-y-3">
          {bookedSlots.map((booking, index) => {
            const bookingDate = new Date(booking.date);
            const formattedDate = bookingDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <div key={index} className="bg-white p-4 rounded-md border border-red-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Schedule #{booking.scheduleId}</h3>
                    <p className="text-gray-600">{formattedDate}</p>
                    <p className="text-gray-800">Time: {booking.time}</p>
                  </div>
                  <div className="bg-red-100 px-2 py-1 rounded text-red-800 text-sm">
                    Booked
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Handle booking submission
  const handleBookAppointment = async () => {
    /*if (!selectedDate || !selectedTimeSlot || !providerId || !clientId) {
      //alert("Please select a date and time slot");
      return;
    }*/

    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    
    setIsSubmitting(true);
    try {
      // Format date for API - extract time from the selectedTimeSlot
      const formattedDate = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
      console.log("asdd"+selectedDate);
      console.log("asddd"+formattedDate);
      
      const timeStart = selectedTimeSlot.time.split(" - ")[0]; // Extract start time
      
      // Format the datetime string in ISO format
      const bookDateTime = `${formattedDate}T${timeStart}:00`;

      // Use service_id from the serviceData
      const serviceId = serviceData.serviceId;

      if (!serviceId) {
        throw new Error("Service ID not found for the selected provider");
      }

      // Create booking data
      const bookingData = {
        consumerId: parseInt(userData.id),
        serviceId: parseInt(serviceId),
        bookingDateTime: bookDateTime
      };

      // Create schedule data
      const scheduleData = {
        providerId: parseInt(providerId),
        dateTime: bookDateTime  // Changed from bookDateTime to dateTime to match backend
      };

      console.log("Sending booking data:", bookingData);
      console.log("data"+formattedDate);
      console.log("Sending schedule data:", scheduleData);

      // Send booking request
      const bookingResponse = await axios.post("http://localhost:8081/api/booking/addBooking", bookingData,
      { headers: { 'Content-Type': 'application/json' } });
      console.log("Booking response:", bookingResponse.data);
      
      // Send schedule request
      const scheduleResponse = await axios.post("http://localhost:8081/api/booking/addSchedule", scheduleData);
      console.log("Schedule response:", scheduleResponse.data);

      // Show success message
      alert("Your appointment has been booked successfully!");

      // Reset selection
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      
      // Refresh provider details to update booked slots
      const bookedDatetimeResponse = await axios.get(
        `http://localhost:8081/api/booking/provider/${providerId}`
      );
      
      // Update booked slots
      if (bookedDatetimeResponse.data[0] && bookedDatetimeResponse.data[0].dateTime) {
        const date = new Date(bookedDatetimeResponse.data[0].dateTime);
        const formattedTime = formatTimeFromDateTime(bookedDatetimeResponse.data[0].dateTime);
        const slotDuration = calculateSlotDuration(
          serviceData.workHours.start, 
          serviceData.workHours.end, 
          serviceData.timePackages
        );
        
        const endTime = addMinutesToTime(formattedTime, slotDuration);
        
        setBookedSlots([{
          date: date.toISOString().split('T')[0],
          startTime: formattedTime,
          endTime: endTime,
          time: `${formattedTime} - ${endTime}`,
          scheduleId: bookedDatetimeResponse.data[0].scheduleId
        }]);

        try {
          setIsSubmitting(true);
      
          navigate("/bookifyapp");
        } catch (error) {
          console.error("Booking failed:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
      
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert(`Failed to book appointment: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-60 py-8">
      <div className="container mx-auto px-4 md:px-10 py-8 bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Client Booking Information</h1>
          {clientId && <p className="text-sm text-gray-600">Client ID: {clientId}</p>}
        </div>

        {loading && (
          <div className="text-center py-6">
            <p>Loading provider information...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <div className="mt-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-200 hover:bg-red-300 text-red-800 px-4 py-1 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Provider Details */}
        {serviceData && !loading && (
          <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Provider Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Provider Name:</span>{" "}
                    {serviceData.providerName || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Specialty:</span>{" "}
                    {serviceData.specialty || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {serviceData.qualification || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Workplace:</span>{" "}
                    {serviceData.workplace || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Contact Number:</span>{" "}
                    {serviceData.contactNumber || "-"}
                  </p>
                  {serviceData.service && (
                    <p>
                      <span className="font-medium">Price:</span>{" "}({serviceData.service.price ? `Rs${serviceData.service.price}` : ""})
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Location Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Clinic/Location:</span>{" "}
                    {serviceData.address.clinic || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Available Days</h2>
              <div className="flex flex-wrap gap-2">
                {Object.keys(serviceData.workingDays).map((day) => (
                  <div
                    key={day}
                    className={`py-2 px-4 rounded-md ${
                      serviceData.workingDays[day]
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-cyan-50 text-gray-600"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
              <p className="bg-cyan-100 p-3 rounded-md inline-block">
                {serviceData.workHours?.start || "09:00"} -{" "}
                {serviceData.workHours?.end || "17:00"}
              </p>
            </div>
          </div>
        )}

        {/* Display Booked Appointments */}
        {/* Booking Calendar - only show if provider details are loaded */}
        {serviceData && !loading && (
          <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
            <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
            <p className="mb-4">
              Please select a date and time slot for your appointment:
            </p>

            {renderCalendar()}
            {renderTimeSlots()}

            {selectedTimeSlot && (
              <div className="mt-6">
                <button
                  
                  onClick={handleBookAppointment}
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting ? "Processing..." : `Book Appointment for ${selectedDate?.toDateString()} at ${selectedTimeSlot.time}`}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg shadow-md p-6 mb-6 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200">
          <h2 className="text-xl font-semibold mb-4">
            Client Booking Instructions
          </h2>
          <div className="bg-cyan-100 p-4 rounded-md">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Select an available date in the calendar (highlighted dates)
              </li>
              <li>Choose a time slot from the available options (unavailable slots are marked as "Booked")</li>
              <li>
                Click the "Book Appointment" button to confirm your selection
              </li>
              <li>Wait for confirmation from the provider</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientBookingPage;