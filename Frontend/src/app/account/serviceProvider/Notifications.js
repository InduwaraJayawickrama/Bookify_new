import React, { useState } from 'react';

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newBooking: true,
      bookingReminders: true,
      bookingCancellations: true,
      systemUpdates: false
    },
    sms: {
      newBooking: true,
      bookingReminders: false,
      bookingCancellations: true,
      systemUpdates: false
    },
    inApp: {
      newBooking: true,
      bookingReminders: true,
      bookingCancellations: true,
      systemUpdates: true
    }
  });

  const handleToggle = (channel, notification) => {
    setNotificationSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [notification]: !prev[channel][notification]
      }
    }));
  };

  const saveSettings = () => {
    // Here you would send the notification settings to your backend
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <p className="text-gray-600 mb-4">
          Control how you receive notifications about bookings, cancellations, and system updates.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-2 px-4 text-left">Notification Type</th>
                <th className="py-2 px-4 text-center">Email</th>
                <th className="py-2 px-4 text-center">SMS</th>
                <th className="py-2 px-4 text-center">In-App</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100">
                <td className="py-3 px-4">New Booking</td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email.newBooking} 
                    onChange={() => handleToggle('email', 'newBooking')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sms.newBooking} 
                    onChange={() => handleToggle('sms', 'newBooking')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.inApp.newBooking} 
                    onChange={() => handleToggle('inApp', 'newBooking')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-3 px-4">Booking Reminders</td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email.bookingReminders} 
                    onChange={() => handleToggle('email', 'bookingReminders')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sms.bookingReminders} 
                    onChange={() => handleToggle('sms', 'bookingReminders')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.inApp.bookingReminders} 
                    onChange={() => handleToggle('inApp', 'bookingReminders')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-3 px-4">Booking Cancellations</td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email.bookingCancellations} 
                    onChange={() => handleToggle('email', 'bookingCancellations')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sms.bookingCancellations} 
                    onChange={() => handleToggle('sms', 'bookingCancellations')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.inApp.bookingCancellations} 
                    onChange={() => handleToggle('inApp', 'bookingCancellations')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">System Updates</td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email.systemUpdates} 
                    onChange={() => handleToggle('email', 'systemUpdates')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sms.systemUpdates} 
                    onChange={() => handleToggle('sms', 'systemUpdates')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.inApp.systemUpdates} 
                    onChange={() => handleToggle('inApp', 'systemUpdates')}
                    className="h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8">
          <h3 className="font-medium mb-2">Notification Preferences</h3>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="h-5 w-5 text-blue-500 mr-2"/>
              <span>Send a daily summary instead of individual notifications</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="h-5 w-5 text-blue-500 mr-2"/>
              <span>Mute all notifications during non-working hours</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={saveSettings}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;