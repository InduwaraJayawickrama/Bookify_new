import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette, LogOut, Shield, Bell } from 'lucide-react';

const Security = () => {
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    loginNotifications: true,
    deviceHistory: true,
    activityLog: true
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Active devices state
  const [activeDevices, setActiveDevices] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Sri Lanka', lastActive: 'Now', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Sri Lanka', lastActive: '2 days ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'Sri Lanka', lastActive: '1 week ago', current: false }
  ]);

  // Remove device handler
  const handleRemoveDevice = (id) => {
    setActiveDevices(prev => prev.filter(device => device.id !== id));
  };

  // Logout from all other devices
  const handleLogoutAll = () => {
    setActiveDevices(prev => prev.filter(device => device.current));
  };

  // Theme management
  const [theme, setTheme] = useState('light');
  const [customColor, setCustomColor] = useState('#6366f1'); // Default indigo color
  
  // Apply theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme classes
    root.classList.remove('light', 'dark', 'custom');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Set custom color property if in custom mode
    if (theme === 'custom') {
      root.style.setProperty('--custom-color', customColor);
      root.style.setProperty('--custom-color-dark', adjustColorBrightness(customColor, -20));
      root.style.setProperty('--custom-color-light', adjustColorBrightness(customColor, 20));
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('customColor', customColor);
  }, [theme, customColor]);
  
  // Load saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('customColor');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setCustomColor(savedColor);
  }, []);
  
  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex, percent) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Save settings handler
  const handleSaveSettings = () => {
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', securitySettings);
    // Show a success message or notification
    alert('Security settings saved successfully!');
  };

  return (
    <div className="bg-cyan-100 p-8 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
          <Shield className="mr-2" /> Security Settings
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          {/* Two-Factor Authentication Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Two-Factor Authentication</h3>
            <div className="flex items-center mb-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="twoFactor"
                    checked={securitySettings.twoFactor}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`block w-14 h-8 rounded-full transition ${securitySettings.twoFactor ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${securitySettings.twoFactor ? 'translate-x-6' : ''}`}></div>
                </div>
                <span className="ml-3 text-gray-700 dark:text-gray-200">Enable Two-Factor Authentication</span>
              </label>
            </div>
            
            {securitySettings.twoFactor && (
              <div className="mb-6 pl-4 border-l-4 border-blue-300 py-2">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Two-factor authentication adds an extra layer of security to your account.
                  After enabling, you'll be required to provide a verification code sent to your phone in addition to your password.
                </p>
                <button className="text-blue-500 hover:text-blue-700 font-medium dark:text-blue-400">
                  Setup Two-Factor Authentication
                </button>
              </div>
            )}
          </div>

          {/* Theme Mode Section (replacing Session Timeout) */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Display Mode</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-md flex items-center gap-2 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
                aria-label="Light mode"
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-md flex items-center gap-2 ${
                  theme === 'dark' ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
                aria-label="Dark mode"
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
              
              <button
                onClick={() => setTheme('custom')}
                className={`p-2 rounded-md flex items-center gap-2 ${
                  theme === 'custom' ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
                aria-label="Custom mode"
              >
                <Palette size={18} />
                <span>Custom</span>
              </button>
            </div>
            
            {theme === 'custom' && (
              <div className="mt-4 ml-2">
                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Theme Color:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-8 h-8 rounded p-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{customColor}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Login Notifications Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center text-gray-800 dark:text-white">
              <Bell className="mr-2" size={18} /> Login Notifications
            </h3>
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  name="loginNotifications"
                  checked={securitySettings.loginNotifications}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500 mr-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 dark:text-gray-200">Email me when someone logs into my account</span>
              </label>
            </div>
          </div>
          
          {/* Active Devices Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Currently Active Devices</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Device</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Location</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Last Active</th>
                    <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDevices.map(device => (
                    <tr key={device.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                        {device.device}
                        {device.current && <span className="text-green-500 text-xs ml-2">(Current)</span>}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{device.location}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{device.lastActive}</td>
                      <td className="py-3 px-4">
                        {!device.current && (
                          <button
                            onClick={() => handleRemoveDevice(device.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <LogOut size={16} className="mr-1" /> Logout
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mb-6">
              <button 
                onClick={handleLogoutAll}
                className="text-red-500 hover:text-red-700 font-medium flex items-center"
              >
                <LogOut size={16} className="mr-1" /> Logout from all other devices
              </button>
            </div>
          </div>
          
          {/* Activity Log Section */}
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox"
                name="activityLog"
                checked={securitySettings.activityLog}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500 mr-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-gray-700 dark:text-gray-200">Keep account activity log for security review</span>
            </label>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button 
              onClick={handleSaveSettings}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Security Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;