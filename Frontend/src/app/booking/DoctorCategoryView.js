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
        const filteredProviders = data
          .filter((provider) =>
            provider.services.some((service) => service.category === "Doctor")
          )
          .map((provider) => ({
            id: provider.providerId,
            firstName: provider.firstName,
            lastName: provider.lastName,
            specialization:
              provider.services[0]?.specialization || "No Service",
            image:
              provider.profileImage ||
              `https://via.placeholder.com/48?text=${provider.username.charAt(
                0
              )}`,
          }));

        setProviders(filteredProviders);
      })
      .catch((error) => console.error("Error fetching providers:", error));
  }, []);

  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const currentProviders = providers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Available Doctors
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-cyan-100">
              <img
                src={provider.image}
                alt={`${provider.firstName} ${provider.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">
              {provider.firstName} {provider.lastName}
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              {provider.specialization}
            </p>
            <Link
              to={`/clientbookingpage?provider=${provider.id}`}
              className="bg-cyan-400 text-white px-5 py-2 rounded-full text-sm hover:bg-cyan-500 transition-colors flex items-center gap-2"
            >
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-300 px-4 py-2 rounded-l-lg"
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-300"
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 px-4 py-2 rounded-r-lg"
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
