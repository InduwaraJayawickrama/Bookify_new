import React, { useState, useEffect } from "react";
import Button from "./button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import image3 from "../../images/Frame 1321314484.png";
import { fetchUserProfile } from "../../services/api";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [userData, setUserData] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo
      ? JSON.parse(savedUserInfo)
      : {
          username: "",
          profilePhoto: "",
          role: "",
          id: "",
        };
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Fetching user profile...");
          const data = await fetchUserProfile();
          console.log("Received user data:", data);

          if (data) {
            setUserData(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
          if (error.message === "Session expired. Please login again.") {
            handleLogout();
          }
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    if (isAuthenticated) {
      loadUserProfile();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUserData({ username: "", profilePhoto: "", role: "" , id: ""});
    setIsAuthenticated(false);
    navigate("/");
  };

  // For debugging - log current state
  console.log("Current auth status:", isAuthenticated);
  console.log("Current user data:", userData);

  return (
    <div className="bg-gray-100 shadow-sm">
      <nav className="sticky top-0 z-10 flex justify-between items-center p-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full h-full rounded-lg border-b-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              <img
                src={image3}
                alt="Medical Consultation"
                className="w-full h-32 object-cover"
              />
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-200 
                ${
                  location.pathname === "/"
                    ? "bg-cyan-400 text-blue-700"
                    : "hover:text-blue-600 hover:bg-blue-50 active:bg-cyan-400"
                }`}
            >
              Home
            </Link>
            <Link
              to="/review"
              className={`text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-50 
                ${
                  location.pathname === "/review"
                    ? "bg-cyan-400 text-blue-700"
                    : "hover:text-blue-600 hover:bg-blue-50 active:bg-cyan-400"
                }`}
            >
              Review
            </Link>
            <Link
              to="/community"
              className={`text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-50 
                ${
                  location.pathname === "/community"
                    ? "bg-cyan-400 text-blue-700"
                    : "hover:text-blue-600 hover:bg-blue-50 active:bg-cyan-400"
                }`}
            >
              Community
            </Link>
            <Link
              to="/service"
              className={`text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-50 
                ${
                  location.pathname === "/service"
                    ? "bg-cyan-400 text-blue-700"
                    : "hover:text-blue-600 hover:bg-blue-50 active:bg-bg-cyan-400"
                }`}
            >
              Service
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 font-medium px-3 py-2 rounded-md transition-all duration-50 
                ${
                  location.pathname === "/contact"
                    ? "bg-cyan-400 text-blue-700"
                    : "hover:text-blue-600 hover:bg-blue-50 active:bg-bg-cyan-400"
                }`}
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button className="hidden md:block bg-white text-gray-700 border hover:bg-gray-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signupcommon">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-gray-700 font-medium hover:text-blue-500 transition-colors">
                      {userData?.username || userData?.email || "Loading..."}
                    </span>
                    {userData?.profilePhoto ? (
                      <img
                        src={userData.profilePhoto}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                        {(
                          userData?.username?.[0] ||
                          userData?.email?.[0] ||
                          "?"
                        ).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${
                      isDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    {userData?.role?.toLowerCase().includes("service") ||
                    userData?.role === "service_provider" ? (
                      <Link
                        to="/accountsettings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Account Settings
                      </Link>
                    ) : userData?.role === "consumer" ? (
                      <Link
                        to="/accountsettings1"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Account Settings
                      </Link>
                    ) : null}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
