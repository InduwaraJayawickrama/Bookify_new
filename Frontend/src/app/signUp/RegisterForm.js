import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import image1 from "../../images/1ae6e703-2e7a-4be5-9ca1-13a2cdd82738.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import {
  registercustomer,
  registerservice,
  testConnection,
} from "../../services/api";
import image2 from "../../images/Frame 1321314484.png";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "consumer", // Default to consumer
    termsAccepted: false,
  });

  // Check backend connection on component mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      const isConnected = await testConnection();
      setBackendStatus(isConnected);
    };

    checkBackendConnection();
  }, []);

  // Parse query parameters to set initial user type
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userType = params.get("type");

    // If type parameter is missing or invalid, redirect to signup selection page
    if (!userType || (userType !== "consumer" && userType !== "service")) {
      navigate("/signupcommon");
    } else {
      setFormData((prev) => ({
        ...prev,
        userType: userType,
      }));
    }
  }, []); // Only run once on component mount

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare registration data
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        termsAccepted: formData.termsAccepted,
      };

      // Choose API endpoint based on user type
      let response;
      if (formData.userType === "consumer") {
        // Make API call to register consumer
        response = await registercustomer(registrationData);
        console.log("Consumer registration successful:", response);

        // Store user info in localStorage
        const userInfo = {
          username: formData.username,
          email: formData.email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate("/Consumer/login");
      } else {
        // Make API call to register service provider
        response = await registerservice(registrationData);
        console.log("Service provider registration successful:", response);

        // Store user info in localStorage
        const userInfo = {
          username: formData.username,
          email: formData.email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate("/service-provider/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.message === "Failed to fetch") {
        setError(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-56 bg-[#F8F6F4] py-10 h-[90%]">
      <div className="flex w-full max-w-4xl bg-[#D2F9FA] shadow-lg rounded-lg overflow-hidden">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${image1})` }}
        ></div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <img src={image2} alt="Logo" className="w-24 mb-2 p-4" />
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-[#B8EEFB] p-2 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold text-center mb-3">
              Create Your Account
            </h2>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {backendStatus === false && !error && (
              <div
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  Warning: Can't connect to the server. Registration might not
                  work properly.
                </span>
              </div>
            )}

            <p className="text-center text-gray-600 mb-2">
              Already have an account?{" "}
              <Link
                to={
                  formData.userType === "consumer"
                    ? "/Consumer/login"
                    : "/service-provider/login"
                }
                className="text-blue-500 font-medium"
              >
                Sign In
              </Link>
            </p>

            <div
              className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-3 rounded mb-4"
              role="alert"
            >
              <p>
                Registering as:{" "}
                <strong>
                  {formData.userType === "consumer"
                    ? "Consumer"
                    : "Service Provider"}
                </strong>
              </p>
            </div>

            <label className="block text-gray-700 text-left mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <label className="block text-gray-700 text-left mb-1">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <label className="block text-gray-700 text-left mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <label className="block text-gray-700 text-left mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-3 py-2 bg-[#27D5E5] rounded hover:bg-[#1CB8CC] text-white font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>

            <p className="text-center text-gray-600 mt-2">or continue with</p>
            <div className="flex justify-center space-x-3 mt-2">
              <button
                type="button"
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"
              >
                <FcGoogle />
              </button>
              <button
                type="button"
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"
              >
                <FaGithub />
              </button>
              <button
                type="button"
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100"
              >
                <FaFacebook />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
