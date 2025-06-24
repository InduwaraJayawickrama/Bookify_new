import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../../images/2149bcff-5c92-4ee7-841d-4e36de2f5770.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import {
  loginUser,
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
} from "../../services/api";
import image2 from "../../images/Frame 1321314484.png";
import RegisterForm from "../signUp/RegisterForm";

const LoginForm = ({ userType = "consumer", resetPassword = false }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: userType === "consumer" ? "CONSUMER" : "SERVICE_PROVIDER",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});

  React.useEffect(() => {
    return () => {
      // Cleanup function to handle any necessary cleanup
      if (!localStorage.getItem("userInfo")) {
        localStorage.setItem("userInfo", JSON.stringify({}));
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Here you would actually call an API to request password reset
    // For now, we'll just simulate it
    try {
      console.log(`Password reset requested for ${resetEmail} (${userType})`);
      setSuccess(`Password reset instructions sent to ${resetEmail}`);
    } catch (error) {
      setError(
        error.message || "Failed to request password reset. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOAuthLogin = async (provider) => {
    setIsLoading(true);
    try {
      let response;
      switch (provider) {
        case "google":
          response = await loginWithGoogle();
          break;
        case "github":
          response = await loginWithGithub();
          break;
        case "facebook":
          response = await loginWithFacebook();
          break;
        default:
          throw new Error("Invalid provider");
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "userRole",
          response.role || userType === "consumer"
            ? "CONSUMER"
            : "SERVICE_PROVIDER"
        );

        if (response.user) {
          const userInfo = {
            ...response.user,
            name: response.user.username,
            client_id: response.user.id,
            role: userType === "consumer" ? "consumers" : "service_providers",
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          if (response.user.id) {
            localStorage.setItem("clientId", response.user.id); // Assuming `id` is the clientId
          }
        } else {
          localStorage.setItem("userInfo", JSON.stringify({}));
        }

        toast.success("Login successful!");
        navigate(userType === "consumer" ? "/" : "/accountsettings");
      }
    } catch (error) {
      toast.error(`${provider} login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
        role: userType === "consumer" ? "consumers" : "service_providers",
      };

      console.log("Attempting login with data:", loginData);
      const response = await loginUser(loginData);

      if (response.token) {
        // Store token
        localStorage.setItem("token", response.token);

        // Store user role
        const role =
          userType === "consumer" ? "consumers" : "service_providers";
        localStorage.setItem("userRole", role);

        // Store complete user data
        if (response.user) {
          const userInfo = {
            ...response.user,
            role: role,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }

        toast.success("Login successful!");

        // Add a small delay before navigation to ensure localStorage is updated
        setTimeout(() => {
          if (userType === "consumer") {
            navigate("/");
          } else {
            navigate("/accountsettings");
          }
        }, 100);
      } else if (response.error) {
        toast.error(
          response.error || "Login failed. Please check your credentials."
        );
        setError(
          response.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Render password reset form if resetPassword is true
  if (resetPassword) {
    return (
      <div className="flex items-center justify-center min-h-56 bg-[#F8F6F4] py-10 h-[90%]">
        <div className="flex w-full max-w-4xl bg-[#D2F9FA] shadow-lg rounded-lg overflow-hidden">
          <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${image1})` }}
          ></div>
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <img src={image2} alt="Logoj" className="w-24 mb-2 p-3" />
            <form
              onSubmit={handleResetPassword}
              className="w-full max-w-sm bg-[#B8EEFB] p-2 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Reset Password
              </h2>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{success}</span>
                </div>
              )}

              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>

              <label className="block text-gray-700 text-left">Email:</label>
              <input
                type="email"
                name="resetEmail"
                placeholder="Email Address"
                value={resetEmail}
                onChange={handleResetEmailChange}
                className="w-full p-2 border rounded mt-2"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-2 bg-[#27D5E5] rounded hover:bg-[#1CB8CC] text-white"
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>

              <div className="text-center mt-4">
                <Link
                  to={
                    userType === "consumer"
                      ? "/Consumer/login"
                      : "/service-provider/login"
                  }
                  className="text-blue-500 hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render login form (default)
  return (
    <div className="flex items-center justify-center min-h-56 bg-[#F8F6F4] py-10 h-[90%]">
      <div className="flex w-full max-w-4xl bg-[#D2F9FA] shadow-lg rounded-lg overflow-hidden">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${image1})` }}
        ></div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <img src={image2} alt="Logo" className="w-24 mb-2 p-3" />
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-[#B8EEFB] p-2 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {userType === "consumer" ? "Login" : "Service Provider Login"}
            </h2>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <label className="block text-gray-700 text-left">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-2 ${
                formErrors.email ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}

            <label className="block text-gray-700 mt-4 text-left">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-2 ${
                formErrors.password ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}

            <div className="text-left mt-4">
              <Link
                to={
                  userType === "consumer"
                    ? "/reset-password"
                    : "/reset-passwords"
                }
                className="hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-2 bg-[#27D5E5] rounded hover:bg-[#1CB8CC] text-white"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-600 mt-4">or continue with</p>
            <div className="flex justify-center space-x-4 mt-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin("google")}
                disabled={isLoading}
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <FcGoogle />
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin("github")}
                disabled={isLoading}
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <FaGithub />
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin("facebook")}
                disabled={isLoading}
                className="p-2 bg-white border rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
              >
                <FaFacebook />
              </button>
            </div>
            <p className="text-center text-gray-700 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signupcommon"
                className="text-blue-500 hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
