import React, { useState } from "react";
import { resetPassword } from "../../../services/api";

const ResetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrorMessage("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Get user email from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const email = userInfo.email;

    if (!email) {
      setErrorMessage("User session not found. Please login again.");
      return;
    }

    // Validate passwords
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (passwordData.oldPassword === passwordData.newPassword) {
      setErrorMessage("New password must be different from current password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword(
        email,
        passwordData.oldPassword,
        passwordData.newPassword
      );

      setSuccessMessage(response.message || "Password reset successfully!");

      // Clear form
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Reset password visibility
      setShowPassword({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    } catch (error) {
      // Handle specific error messages
      const errorMessage =
        error.message || "Failed to reset password. Please try again.";
      if (errorMessage.includes("Current password is incorrect")) {
        setErrorMessage(
          "The current password you entered is incorrect. Please try again."
        );
      } else {
        setErrorMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">Reset Password</h2>

      <div className="flex">
        <div className="flex-1">
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword.oldPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword.newPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword.confirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </button>
            </div>

            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
          </form>
        </div>

        <div className="flex-1 ml-6">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/api/placeholder/200/150"
              alt="Doctor"
              className="mb-4 rounded-lg"
            />
            <img
              src="/api/placeholder/200/150"
              alt="Teacher"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
