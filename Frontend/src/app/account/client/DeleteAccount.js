import React, { useState } from 'react';

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (reason) {
      setShowConfirmation(true);
    }
  };
  
  const handleFinalConfirmation = (e) => {
    e.preventDefault();
    if (confirmText === 'DELETE' && password) {
      // Here you would handle the actual account deletion
      alert('Account deletion process initiated');
    }
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Delete Account</h2>
      <p className="text-red-600 mb-6">Warning: This action cannot be undone.</p>
      
      <div className="bg-blue-50 rounded-lg p-6">
        {!showConfirmation ? (
          <form onSubmit={handleInitialSubmit}>
            <div className="mb-6">
              <p className="mb-4">
                We're sorry to see you go. Before you delete your account, please consider:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All your personal information and service history will be permanently deleted</li>
                <li>Any future bookings will be canceled automatically</li>
                <li>You won't be able to recover your account or data once deleted</li>
              </ul>
              <p>
                If you're experiencing issues with our platform, our support team is here to help. 
                Consider <a href="#" className="text-blue-500">contacting support</a> before making this decision.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Please tell us why you're deleting your account:
              </label>
              <select 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded-md p-2 mb-2"
                required
              >
                <option value="">Select a reason</option>
                <option value="not-using">I'm not using the service anymore</option>
                <option value="alternative">I found an alternative service</option>
                <option value="dissatisfied">I'm dissatisfied with the service</option>
                <option value="technical">I'm experiencing technical issues</option>
                <option value="privacy">Privacy concerns</option>
                <option value="other">Other reason</option>
              </select>
              
              {reason === 'other' && (
                <textarea 
                  placeholder="Please specify your reason"
                  className="w-full border rounded-md p-2 h-24"
                ></textarea>
              )}
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
              >
                Continue to Account Deletion
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFinalConfirmation}>
            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <h3 className="font-medium text-red-600 mb-2">Final Confirmation</h3>
                <p className="text-gray-700">
                  This action will permanently delete your account and all associated data. 
                  This cannot be undone.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Please enter your password to confirm:
                </label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md p-2" 
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Type "DELETE" to confirm account deletion:
                </label>
                <input 
                  type="text" 
                  value={confirmText} 
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full border rounded-md p-2" 
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={confirmText !== 'DELETE' || !password}
                className={`py-2 px-6 rounded-md text-white ${
                  confirmText === 'DELETE' && password 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-red-300 cursor-not-allowed'
                }`}
              >
                Permanently Delete Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;