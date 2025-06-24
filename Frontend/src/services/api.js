export const BASE_URL = "http://localhost:8081/";

const API_BASE_URL = "http://localhost:8081/api/consumer";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      headers: Object.fromEntries(response.headers.entries()),
    });
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "An error occurred");
    } catch (e) {
      throw new Error(errorText || "An error occurred");
    }
  }

  if (contentType && contentType.includes("application/json")) {
    try {
      const jsonData = await response.json();
      console.log("API Success Response:", jsonData);
      return jsonData;
    } catch (e) {
      console.error("JSON Parse Error:", e);
      return { success: true };
    }
  } else {
    const textData = await response.text();
    console.log("API Text Response:", textData);
    return { success: true, data: textData };
  }
};

// Helper function to handle network errors
const handleNetworkError = (error) => {
  console.error("Network Error:", error);
  if (!window.navigator.onLine) {
    throw new Error("No internet connection. Please check your network.");
  }
  if (error.message === "Failed to fetch") {
    throw new Error(
      "Unable to connect to the server. Please ensure the backend is running."
    );
  }
  throw error;
};

// Helper function to clean token - remove any invalid characters
const cleanToken = (token) => {
  if (!token) return "";

  // Remove 'Bearer ' prefix if present
  let cleanedToken = token.replace(/^Bearer\s+/i, "");

  // Remove any whitespace
  cleanedToken = cleanedToken.trim();

  console.log("Token cleaned:", cleanedToken.substring(0, 10) + "...");

  return cleanedToken;
};

// Helper function to handle auth errors
const handleAuthError = (error) => {
  console.error("Authentication error:", error);
  // Clear all auth-related data
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userRole");

  // Only redirect if we're not already on the login page
  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/service-provider/login";
  }
  throw new Error("Session expired. Please login again.");
};

// Registration endpoints
export const registerservice = async (formData) => {
  const endpoint = "auth/service-provider/register";

  console.log("Registration request:", {
    url: `${BASE_URL}${endpoint}`,
    data: formData,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        termsAccepted: formData.termsAccepted,
      }),
    });

    return handleResponse(response);
  } catch (error) {
    return handleNetworkError(error);
  }
};

export const registercustomer = async (formData) => {
  const endpoint = "auth/consumer/register";

  console.log("Registration request:", {
    url: `${BASE_URL}${endpoint}`,
    data: formData,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
        role: "CONSUMER",
        termsAccepted: formData.termsAccepted,
      }),
    });

    return handleResponse(response);
  } catch (error) {
    return handleNetworkError(error);
  }
};

// Login endpoints
export const loginUser = async (formData) => {
  try {
    console.log("Login request URL:", `${BASE_URL}auth/login`);
    console.log("Login data:", formData);

    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    // Log the response status and headers for debugging
    console.log("Login response status:", response.status);
    console.log(
      "Login response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Check if the response is empty
    const responseText = await response.text();
    console.log("Login response text:", responseText);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.error || "Login failed");
      } catch (e) {
        throw new Error(
          `Login failed: ${response.status} ${response.statusText}`
        );
      }
    }

    // Parse the response text as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Error parsing login response:", e);
      throw new Error("Invalid response from server");
    }

    console.log("Login response data:", data);

    // Clean and store the token
    if (data.token) {
      const token = data.token.replace("Bearer ", "").trim();
      localStorage.setItem("token", token);
      console.log("Stored token in localStorage");
    }

    // Store user info
    if (data.user) {
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      console.log("Stored user info in localStorage");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Google login failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithGithub = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/github`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("GitHub login failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithFacebook = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/facebook`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Facebook login failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Helper function to get user role
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// Helper function to get auth header
export const getAuthHeader = () => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error("Error getting auth header:", error);
    return {};
  }
};

// Test connection to backend
export const testConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}actuator/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Backend connection test failed:", error);
    return false;
  }
};

// Fetch service providers for consumer booking
export const fetchServiceProviders = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${BASE_URL}api/service-providers/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Failed to fetch service providers (${response.status})`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching service providers:", error);
    throw error;
  }
};

// Fetch specific service provider details
export const fetchServiceProviderDetails = async (providerId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(
      `${BASE_URL}api/service-providers/${providerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          name: "-",
          username: "-",
          specialty: "-",
          qualification: "-",
          contactNumber: "-",
          workplace: "-",
          workHours: { start: "09:00", end: "17:00" },
          address: {
            clinic: "-",
            district: "-",
            county: "-",
          },
        };
      }
      throw new Error(
        `Failed to fetch service provider details (${response.status})`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching service provider details:", error);
    throw error;
  }
};

// Create a booking appointment
export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${BASE_URL}api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Update service provider profile
export const updateServiceProviderProfile = async (profileData) => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    console.log("Sending profile update with data:", profileData);

    const response = await fetch(`${BASE_URL}api/service-providers/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    });

    console.log("Profile update response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile update error response:", errorText);

      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error(errorText || "Authentication failed"));
      }

      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || errorText);
      } catch (e) {
        throw new Error(errorText || "Failed to update profile");
      }
    }

    const updatedData = await response.json();
    console.log("Profile update success response:", updatedData);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const newUserInfo = {
      ...userInfo,
      ...updatedData,
    };
    console.log("Updating localStorage with:", newUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));

    return updatedData;
  } catch (error) {
    console.error("Error updating service provider profile:", error);
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Session expired") ||
      error.message.includes("Invalid token")
    ) {
      return handleAuthError(error);
    }
    throw error;
  }
};

// Fetch user profile data
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    throw new Error("Authentication required");
  }

  try {
    // Clean the token - remove any whitespace and ensure no 'Bearer ' prefix
    const cleanToken = token.replace(/^Bearer\s+/i, "").trim();
    console.log("Using cleaned token for authentication");

    const response = await fetch(`${BASE_URL}api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleanToken}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("Profile response status:", response.status);
    console.log(
      "Profile response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile fetch error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        throw new Error("Session expired. Please login again.");
      }

      throw new Error(
        `Failed to fetch user profile (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Profile data received:", data);

    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Fetch service provider profile
export const fetchServiceProviderProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    throw new Error("Authentication required");
  }

  try {
    // Clean the token - remove any whitespace and ensure no 'Bearer ' prefix
    const cleanToken = token.replace(/^Bearer\s+/i, "").trim();
    console.log("Using cleaned token for authentication");

    const response = await fetch(`${BASE_URL}api/service-providers/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleanToken}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("Profile response status:", response.status);
    console.log(
      "Profile response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Profile fetch error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        throw new Error("Session expired. Please login again.");
      }

      throw new Error(
        `Failed to fetch profile (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Profile data received:", data);

    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Error fetching service provider profile:", error);
    throw error;
  }
};

// Service Management APIs
export const fetchProviderServices = async () => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}api/service-providers/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error("Authentication failed"));
      }
      throw new Error(`Failed to fetch services (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching provider services:", error);
    throw error;
  }
};

export const updateProviderService = async (serviceData) => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}api/service-providers/services`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error("Authentication failed"));
      }
      throw new Error(`Failed to update service (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating provider service:", error);
    throw error;
  }
};

export const createProviderService = async (serviceData) => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    const response = await fetch(`${BASE_URL}api/service-providers/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error("Authentication failed"));
      }
      throw new Error(`Failed to create service (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating provider service:", error);
    throw error;
  }
};

export const deleteProviderService = async (serviceId) => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    const response = await fetch(
      `${BASE_URL}api/service-providers/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error("Authentication failed"));
      }
      throw new Error(`Failed to delete service (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting provider service:", error);
    throw error;
  }
};

export const fetchServiceById = async (serviceId) => {
  try {
    const token = cleanToken(localStorage.getItem("token"));
    const response = await fetch(
      `${BASE_URL}api/service-providers/services/${serviceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return handleAuthError(new Error("Authentication failed"));
      }
      if (response.status === 404) {
        throw new Error("Service not found");
      }
      throw new Error(`Failed to fetch service (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};

export const resetPassword = async (email, oldPassword, newPassword) => {
  try {
    const authHeader = getAuthHeader();

    const response = await fetch(`${BASE_URL}auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        oldPassword,
        newPassword,
      }),
    });

    const data = await handleResponse(response);
    return data.message || "Password updated successfully";
  } catch (error) {
    console.error("Password reset error:", error);
    throw new Error(error.message || "Failed to reset password");
  }
};

export const userService = {
  async getCurrentUser(userId) {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Clean the token - remove any whitespace and ensure no 'Bearer ' prefix
      const cleanAuthToken = cleanToken(token);
      console.log("Using cleaned token for authentication");

      // Make API request with authentication header
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanAuthToken}`,
          Accept: "application/json",
        },
        credentials: "include",
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching user data:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // Try to parse the error as JSON
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(
            errorJson.error ||
              `Failed to fetch user data: ${response.status} ${response.statusText}`
          );
        } catch (e) {
          throw new Error(
            `Failed to fetch user data: ${response.status} ${response.statusText}`
          );
        }
      }

      // Parse and return the response
      const data = await response.json();
      console.log("User data fetched successfully:", data);

      // Map the backend data to match frontend structure
      const mappedData = {
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        notes: data.notes || "",
        address:
          data.address ||
          JSON.stringify({
            country: "",
            city: "",
            district: "",
            postalCode: "",
          }),
        client_id: data.client_id,
        status: data.status,
      };

      return mappedData;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Clean the token - remove any whitespace and ensure no 'Bearer ' prefix
      const cleanAuthToken = cleanToken(token);
      console.log("Using cleaned token for authentication");

      // Check if profile image is a base64 string and truncate if necessary
      let updatedUserData = { ...userData };
      if (
        updatedUserData.profileImage &&
        updatedUserData.profileImage.startsWith("data:image")
      ) {
        // If the base64 string is too long, we need to handle it
        if (updatedUserData.profileImage.length > 65535) {
          // MySQL TEXT column limit
          console.warn("Profile image data is too large, truncating...");
          // Store only the first part of the base64 string
          updatedUserData.profileImage = updatedUserData.profileImage.substring(
            0,
            65535
          );
        }
      }

      // Make API request with authentication header
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanAuthToken}`,
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedUserData),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error updating user data:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // Try to parse the error as JSON
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(
            errorJson.error ||
              `Failed to update user data: ${response.status} ${response.statusText}`
          );
        } catch (e) {
          throw new Error(
            `Failed to update user data: ${response.status} ${response.statusText}`
          );
        }
      }

      // Parse and return the response
      const data = await response.json();
      console.log("User data updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  },
};
