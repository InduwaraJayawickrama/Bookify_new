import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommonCategoryView = () => {
  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:8081/api/booking/providers")
      .then((response) => response.json())
      .then((data) => {
        const formattedProviders = data.map((provider) => ({
          id: provider.provider_id || provider.providerId, // use either field if available
          name: provider.username,
          firstName: provider.firstName,
          lastName: provider.lastName,
          specialization:
            provider.services?.length > 0
              ? provider.services[0].specialization
              : "No Service",
          category:
            provider.services?.length > 0
              ? provider.services[0].category
              : "No Category",
          profileImage: provider.profileImage
            ? provider.profileImage // full URL already provided
            : "/images/default-avatar.png",
        }));
        setProviders(formattedProviders);
      })
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const currentProviders = providers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/default-avatar.png";
  };

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold mb-6">Common Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center">
              {/* Profile Image Container */}
              <div className="w-24 h-24 mb-4">
                <img
                  src={provider.profileImage}
                  alt={`${provider.name}'s profile`}
                  onError={handleImageError}
                  className="w-full h-full rounded-full object-cover border-4 border-cyan-100"
                />
              </div>

              {/* Provider Info */}
              <div className="text-center mb-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {provider.firstName} {provider.lastName}
                </h4>
                <p className="text-cyan-500 font-medium">{provider.category}</p>
                <p className="text-sm text-gray-500">
                  {provider.specialization}
                </p>
              </div>

              {/* Book Now Button */}
              <Link
                to={`/clientbookingpage?provider=${provider.id}`}
                className="inline-flex items-center px-6 py-2 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition-colors"
              >
                Book Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommonCategoryView;
