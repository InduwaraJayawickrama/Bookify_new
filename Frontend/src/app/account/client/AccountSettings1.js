import React, { useState, useEffect } from "react";
import MyProfile from "./MyProfile";
import Notifications from "./Notifications";
import Security from "./Security";
import ResetPassword from "./ResetPassword";
import DeleteAccount from "./DeleteAccount";
import Navigation from "../../../components/ui/navigation";
import MyBooking from "./MyBooking";
import { userService } from "../../../services/api";
import { toast } from "react-toastify";

const AccountSettings1 = () => {
  const [currentPage, setCurrentPage] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    photo: "/profile-image.jpg",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    },
    address: {
      country: "",
      city: "",
      district: "",
      postalCode: "",
    },
  });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // First check if we have a token
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "Authentication token not found. Please log in again."
          );
        }

        // Try to get user ID from localStorage
        let userId = localStorage.getItem("userId");

        // If no userId, try to get it from userInfo
        if (!userId) {
          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            try {
              const parsedUserInfo = JSON.parse(userInfo);
              if (parsedUserInfo.client_id) {
                userId = parsedUserInfo.client_id;
                localStorage.setItem("userId", userId);
                console.log("User ID stored from userInfo.client_id:", userId);
              } else if (parsedUserInfo.id) {
                userId = parsedUserInfo.id;
                localStorage.setItem("userId", userId);
                console.log("User ID stored from userInfo.id:", userId);
              }
            } catch (e) {
              console.error("Error parsing userInfo:", e);
            }
          }
        }

        // If we still don't have a userId, we can't proceed
        if (!userId) {
          throw new Error("User ID not found. Please log in again.");
        }

        let response;
        try {
          // Try to fetch user data from backend
          response = await userService.getCurrentUser(userId);
          console.log("User data fetched from backend:", response);
        } catch (fetchError) {
          console.warn(
            "Failed to fetch user data from backend, using mock data:",
            fetchError
          );

          // Use mock data for development when backend is not connected
          response = {
            username: "John Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            notes: "This is a mock user profile for development purposes.",
            address: JSON.stringify({
              country: "United States",
              city: "New York",
              district: "Manhattan",
              postalCode: "10001",
            }),
          };
        }

        // Map backend data to frontend format
        const mappedUserData = {
          firstName: response.username || "",
          email: response.email || "",
          phone: response.phone || "",
          bio: response.notes || "",
          address: {
            country: response.address
              ? JSON.parse(response.address).country
              : "",
            city: response.address ? JSON.parse(response.address).city : "",
            district: response.address
              ? JSON.parse(response.address).district
              : "",
            postalCode: response.address
              ? JSON.parse(response.address).postalCode
              : "",
          },
        };

        setUserData(mappedUserData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error(err.message || "Failed to fetch user data");
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderSidebar = () => {
    return (
      <div className="w-full md:w-48 bg-cyan-50 rounded-lg shadow-sm p-4">
        <SidebarItem
          label="My Profile"
          active={currentPage === "profile"}
          onClick={() => setCurrentPage("profile")}
        />
        <SidebarItem
          label="Notifications"
          active={currentPage === "notifications"}
          onClick={() => setCurrentPage("notifications")}
        />
        <SidebarItem
          label="My Booking"
          active={currentPage === "myBooking"}
          onClick={() => setCurrentPage("myBooking")}
        />
        <SidebarItem
          label="Security"
          active={currentPage === "security"}
          onClick={() => setCurrentPage("security")}
        />
        <SidebarItem
          label="Reset Password"
          active={currentPage === "resetPassword"}
          onClick={() => setCurrentPage("resetPassword")}
        />

        <div className="mt-8">
          <button
            onClick={() => setCurrentPage("deleteAccount")}
            className="text-red-500 font-medium hover:text-red-600 transition"
          >
            Delete account
          </button>
        </div>
      </div>
    );
  };

  const SidebarItem = ({ label, active, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={`py-3 px-4 my-1 cursor-pointer rounded-md transition ${
          active
            ? "bg-blue-100 text-blue-500 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {label}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-blue-500">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    switch (currentPage) {
      case "profile":
        return <MyProfile />;
      case "notifications":
        return <Notifications />;
      case "myBooking":
        return <MyBooking />;
      case "security":
        return <Security />;
      case "resetPassword":
        return <ResetPassword />;
      case "deleteAccount":
        return <DeleteAccount />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <Navigation />

        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {renderSidebar()}

          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ label }) => {
  return (
    <a href="#" className="text-blue-500 hover:text-blue-600 transition">
      {label}
    </a>
  );
};

export default AccountSettings1;
