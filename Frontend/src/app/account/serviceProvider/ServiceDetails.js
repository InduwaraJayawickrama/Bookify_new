import React, { useState, useEffect } from "react";
import Navigation from "../../../components/ui/navigation";
import {
  fetchProviderServices,
  updateProviderService,
} from "../../../services/api";

const ServiceDetails = ({ serviceData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: serviceData?.name || "",
    specialization: serviceData?.specialization || "",
    price: serviceData?.price || 0,
    description: serviceData?.description || "",
    category: serviceData?.category || "",
    workHours: serviceData?.workHours || {
      start: "08:00",
      end: "17:00",
    },
    workingDays: serviceData?.workingDays || {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    timePackages: serviceData?.timePackages || 4,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Add ordered days array
  const orderedDays = [
    { key: "Monday", label: "Monday" },
    { key: "Tuesday", label: "Tuesday" },
    { key: "Wednesday", label: "Wednesday" },
    { key: "Thursday", label: "Thursday" },
    { key: "Friday", label: "Friday" },
    { key: "Saturday", label: "Saturday" },
    { key: "Sunday", label: "Sunday" },
  ];

  // Add category options
  const categoryOptions = [
    { value: "Doctor", label: "Doctor" },
    { value: "Teacher", label: "Teacher" },
    { value: "Fitness Coach", label: "Fitness Coach" },
  ];

  useEffect(() => {
    loadServiceData();
  }, []);

  const loadServiceData = async () => {
    try {
      const services = await fetchProviderServices();
      if (services && services.length > 0) {
        const service = services[0]; // Assuming we're working with the first service
        setFormData({
          name: service.name || "",
          specialization: service.specialization || "",
          price: service.price || 0,
          description: service.description || "",
          category: service.category || "",
          workHours: service.workHours || {
            start: "08:00",
            end: "17:00",
          },
          workingDays: service.workingDays || {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          },
          timePackages: service.timePackages || 4,
        });
      }
    } catch (error) {
      setError("Failed to load service data");
      console.error("Error loading service data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [name]: value,
      },
    }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProviderService(formData);
      setSuccess(true);
      setError(null);
      setEditMode(false);
    } catch (error) {
      setError("Failed to update service details");
      console.error("Error updating service:", error);
    }
  };

  // Helper function to calculate and display time slot duration
  const calculateTimeSlotDuration = (start, end, packages) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const totalMinutes = endMinutes - startMinutes;

    const slotDuration = Math.floor(totalMinutes / packages);
    const hours = Math.floor(slotDuration / 60);
    const minutes = slotDuration % 60;

    let durationText = "";
    if (hours > 0) {
      durationText += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      durationText += `${hours > 0 ? " and " : ""}${minutes} minute${
        minutes > 1 ? "s" : ""
      }`;
    }

    return `Each time slot will be ${durationText} long.`;
  };

  return (
    <div className="bg-cyan-100 p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Service Details</h2>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Edit Details
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Service details updated successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Provider Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Provider Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="py-2">{formData.name || "Not specified"}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Specialty/Service
            </label>
            {editMode ? (
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="py-2">
                {formData.specialization || "Not specified"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            {editMode ? (
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="py-2">{formData.price || "Not specified"}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            {editMode ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="py-2">{formData.description || "Not specified"}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            {editMode ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <p className="py-2">{formData.category || "Not specified"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Availability Settings</h3>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Working Days</h4>
          {editMode ? (
            <div className="flex flex-wrap gap-2">
              {orderedDays.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleDayToggle(key)}
                  type="button"
                  className={`py-2 px-3 rounded-md ${
                    formData.workingDays[key]
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {orderedDays.map(({ key, label }) => (
                <span
                  key={key}
                  className={`py-2 px-3 rounded-md ${
                    formData.workingDays[key]
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-2">Working Hours</h4>
            {editMode ? (
              <div className="flex items-center gap-2">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="start"
                    value={formData.workHours.start}
                    onChange={handleWorkHoursChange}
                    className="border rounded-md p-2"
                  />
                </div>
                <span className="mt-6">to</span>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="end"
                    value={formData.workHours.end}
                    onChange={handleWorkHoursChange}
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
            ) : (
              <p className="py-2">
                {formData.workHours.start} to {formData.workHours.end}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">Time Slots</h4>
            {editMode ? (
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Number of Time Slots
                </label>
                <input
                  type="number"
                  name="timePackages"
                  min="1"
                  max="12"
                  value={formData.timePackages}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
            ) : (
              <p className="py-2">
                {formData.timePackages} slots per working day
              </p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Time Slot Summary</h4>
          <p className="text-sm text-gray-700">
            Working hours: {formData.workHours.start} - {formData.workHours.end}
          </p>
          <p className="text-sm text-gray-700">
            {calculateTimeSlotDuration(
              formData.workHours.start,
              formData.workHours.end,
              formData.timePackages
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
