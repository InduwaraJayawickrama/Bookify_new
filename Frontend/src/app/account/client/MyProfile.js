import React, { useState, useEffect } from "react";
import { userService } from "../../../services/api";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";
import styled from "styled-components";

// Styled components
const ProfileContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 20px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const ProfileCard = styled.div`
  background: #bce3ec;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;

  p {
    margin: 5px 0;
    color: #222;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Bold = styled.span`
  font-weight: bold;
  font-size: 17px;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

const Section = styled.div`
  background: #bce3ec;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    font-size: 18px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 48%;
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    div {
      width: 100%;
    }
  }
`;

const Email = styled.a`
  color: #0056b3;
  font-weight: bold;
  text-decoration: none;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePreview = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

const PreviewImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImageUploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #0056b3;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;

  &:hover {
    background: #003d82;
  }

  input[type="file"] {
    display: none;
  }
`;

// Update the default avatar path
const DEFAULT_AVATAR = "/images/default-avatar.svg";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "/images/default-avatar.png",
    address: {
      country: "",
      city: "",
      district: "",
      postalCode: "",
    },
    status: "",
  });

  // State to track which sections are being edited
  const [editMode, setEditMode] = useState({
    profile: false,
    personal: false,
    address: false,
  });

  // Form state for editing
  const [formData, setFormData] = useState({ ...user });

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState(() => {
    // Try to get saved image from localStorage on initial load
    const savedImage = localStorage.getItem("tempProfileImage");
    return savedImage || null;
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
              } else if (parsedUserInfo.id) {
                userId = parsedUserInfo.id;
                localStorage.setItem("userId", userId);
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

        // Clean the token before using it
        const cleanToken = token.replace(/^Bearer\\s+/i, "").trim();
        localStorage.setItem("token", cleanToken);

        // Fetch user data from backend
        const response = await userService.getCurrentUser(userId);

        // Parse address if it's a string
        let addressData = {};
        try {
          addressData =
            typeof response.address === "string"
              ? JSON.parse(response.address)
              : response.address || {};
        } catch (e) {
          console.warn("Error parsing address:", e);
          addressData = {};
        }

        // Check if we have a temporary profile image
        const tempProfileImage = localStorage.getItem("tempProfileImage");

        // Map backend data to frontend format
        const mappedUserData = {
          firstName: response.username || "",
          lastName: "",
          email: response.email || "",
          phone: response.phone || "",
          bio: response.notes || "",
          profileImage:
            tempProfileImage || response.profileImage || DEFAULT_AVATAR,
          address: {
            country: addressData.country || "",
            city: addressData.city || "",
            district: addressData.district || "",
            postalCode: addressData.postalCode || "",
          },
          status: response.status || "",
        };

        setUser(mappedUserData);
        setFormData(mappedUserData);
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

  // Toggle edit mode for a section
  const toggleEditMode = (section) => {
    // Reset form data to current user data when entering edit mode
    if (!editMode[section]) {
      setFormData({ ...user });
    }

    setEditMode({
      ...editMode,
      [section]: !editMode[section],
    });
  };

  // Handle input changes
  const handleInputChange = (e, section, nestedField = null) => {
    const { name, value } = e.target;

    if (nestedField) {
      setFormData({
        ...formData,
        [nestedField]: {
          ...formData[nestedField],
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Save changes to backend
  const saveChanges = async (section) => {
    setLoading(true);
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem("userId");

      // If we still don't have a userId, we can't proceed
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Check if profile image is a base64 string and truncate if necessary
      let profileImage = formData.profileImage;
      if (profileImage && profileImage.startsWith("data:image")) {
        // If the base64 string is too long, we need to handle it
        if (profileImage.length > 65535) {
          // MySQL TEXT column limit
          console.warn("Profile image data is too large, truncating...");
          // Store only the first part of the base64 string
          profileImage = profileImage.substring(0, 65535);
        }
      }

      // Map frontend data to backend format
      const backendData = {
        username: formData.firstName, // Using firstName as username since backend has only username
        email: formData.email,
        phone: formData.phone,
        notes: formData.bio,
        address: JSON.stringify({
          country: formData.address.country,
          city: formData.address.city,
          district: formData.address.district,
          postalCode: formData.address.postalCode,
        }),
        status: formData.status,
        profileImage: profileImage, // Use the potentially truncated image
      };

      // Update user data in backend
      await userService.updateUser(userId, backendData);
      console.log("User data updated in backend successfully");

      // Update local state
      setUser({ ...formData });
      toggleEditMode(section);
      toast.success("Profile updated successfully!");
      setLoading(false);
    } catch (err) {
      console.error("Error updating user data:", err);
      toast.error(err.message || "Failed to update profile");
      setLoading(false);
    }
  };

  // Cancel editing
  const cancelEdit = (section) => {
    toggleEditMode(section);
  };

  // Handle profile image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      // Create local preview immediately
      const localUrl = URL.createObjectURL(file);

      // Compress the image before storing
      const compressedImage = await compressImage(file);

      // Store image data in localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save the compressed base64 image data to localStorage
        localStorage.setItem("tempProfileImage", reader.result);
        setLocalImageUrl(reader.result);

        // Update user and form data
        setUser((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(compressedImage);

      setImageUploadLoading(true);
      // ... rest of upload code ...
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Function to compress image
  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG with 0.7 quality (70%)
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.7
          );
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      // Only cleanup the object URL if we're using one
      if (localImageUrl && localImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localImageUrl);
      }
    };
  }, [localImageUrl]);

  // Handle image loading errors with retry
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);

    // Try to get the saved image from localStorage
    const savedImage = localStorage.getItem("tempProfileImage");
    if (savedImage) {
      e.target.src = savedImage;
    } else if (user.profileImage && user.profileImage !== DEFAULT_AVATAR) {
      // If no saved image, try the user's profile image
      const timestamp = new Date().getTime();
      e.target.src = `${user.profileImage}?t=${timestamp}`;
    } else {
      // If all else fails, use default avatar
      e.target.src = DEFAULT_AVATAR;
    }
  };

  // Handle image click to show preview
  const handleImageClick = () => {
    if (
      user.profileImage &&
      user.profileImage !== "/images/default-avatar.png" &&
      user.profileImage !== "/images/default-avatar.svg"
    ) {
      setShowImagePreview(true);
    }
  };

  // Handle closing the preview
  const handleClosePreview = () => {
    setShowImagePreview(false);
  };

  if (loading) {
    return (
      <div className="bg-cyan-100 rounded-lg shadow p-6 flex justify-center items-center h-64">
        <div className="text-blue-500">Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-cyan-100 rounded-lg shadow p-6">
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

  return (
    <ProfileContainer>
      {/* Image Preview Modal */}
      <ImagePreview
        className={showImagePreview ? "visible" : ""}
        onClick={handleClosePreview}
      >
        <PreviewImage
          src={user.profileImage}
          alt="Profile Preview"
          onClick={(e) => e.stopPropagation()}
        />
        <CloseButton onClick={handleClosePreview}>×</CloseButton>
      </ImagePreview>

      <h2 className="text-xl font-semibold mb-6 text-blue-500">My Profile</h2>

      {/* Profile Overview Section */}
      <ProfileCard>
        {!editMode.profile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ProfileImageContainer>
                <ProfileImage
                  key={localImageUrl || user.profileImage}
                  src={localImageUrl || user.profileImage || DEFAULT_AVATAR}
                  alt="Profile"
                  onError={handleImageError}
                  onClick={handleImageClick}
                />
                <ImageUploadButton>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploadLoading}
                  />
                  <Pencil size={16} />
                </ImageUploadButton>
              </ProfileImageContainer>
              <ProfileDetails>
                <p>
                  <Bold>
                    Name: {user.firstName} {user.lastName}
                  </Bold>
                </p>
                <p>
                  <Bold>Bio: {user.bio || "Not specified"}</Bold>
                </p>
              </ProfileDetails>
            </div>
            <EditIcon onClick={() => toggleEditMode("profile")}>
              <Pencil size={20} />
            </EditIcon>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange(e)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit("profile")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges("profile")}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </ProfileCard>

      {/* Personal Information Section */}
      <Section>
        <div className="flex justify-between items-center mb-4">
          <h3>Personnel Information</h3>
          {!editMode.personal && (
            <EditIcon onClick={() => toggleEditMode("personal")}>
              <Pencil size={20} />
            </EditIcon>
          )}
        </div>

        {!editMode.personal ? (
          <Info>
            <div>
              <p className="text-gray-600 mb-1">First Name</p>
              <p>
                <Bold>{user.firstName || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Last Name</p>
              <p>
                <Bold>{user.lastName || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">E-mail</p>
              <p>
                <Bold>{user.email || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Tel No.</p>
              <p>
                <Bold>{user.phone || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Bio</p>
              <p>
                <Bold>{user.bio || "Not specified"}</Bold>
              </p>
            </div>
          </Info>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  Tel No.
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit("personal")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges("personal")}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* Address Section */}
      <Section>
        <div className="flex justify-between items-center mb-4">
          <h3>Address</h3>
          {!editMode.address && (
            <EditIcon onClick={() => toggleEditMode("address")}>
              <Pencil size={20} />
            </EditIcon>
          )}
        </div>

        {!editMode.address ? (
          <Info>
            <div>
              <p className="text-gray-600 mb-1">Country</p>
              <p>
                <Bold>{user.address.country || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">District</p>
              <p>
                <Bold>{user.address.district || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">City</p>
              <p>
                <Bold>{user.address.city || "Not specified"}</Bold>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Postal Code</p>
              <p>
                <Bold>{user.address.postalCode || "Not specified"}</Bold>
              </p>
            </div>
          </Info>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={(e) => handleInputChange(e, null, "address")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.address.district}
                  onChange={(e) => handleInputChange(e, null, "address")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, null, "address")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => handleInputChange(e, null, "address")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded text-gray-700"
                onClick={() => cancelEdit("address")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 px-3 py-1 rounded text-white"
                onClick={() => saveChanges("address")}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </Section>
    </ProfileContainer>
  );
};

export default MyProfile;
