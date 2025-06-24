import React, { useState } from 'react';

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    category: 'All',
    rating: 0,
    price: [0, 500],
    availability: 'Any',
    distance: 50
  });

  const handleCategoryChange = (category) => {
    setFilters({...filters, category});
  };

  const handleRatingChange = (rating) => {
    setFilters({...filters, rating});
  };

  const handlePriceChange = (price) => {
    setFilters({...filters, price});
  };

  const handleAvailabilityChange = (availability) => {
    setFilters({...filters, availability});
  };

  const handleDistanceChange = (e) => {
    setFilters({...filters, distance: parseInt(e.target.value)});
  };

  const categories = ['All', 'Doctor', 'Teacher', 'Fitness Coach', 'Other'];
  const ratings = [5, 4, 3, 2, 1];
  const availabilityOptions = ['Any', 'Today', 'This Week', 'Next Week', 'Weekend'];

  return (
    <div className="bg-blue-50 rounded-3xl p-8">
      <h3 className="text-lg font-medium mb-6">Filter Options</h3>
      
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.category === category 
                    ? 'bg-cyan-400 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Minimum Rating</h4>
          <div className="flex gap-2">
            {ratings.map(rating => (
              <button
                key={rating}
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  filters.rating >= rating 
                    ? 'bg-cyan-400 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleRatingChange(rating)}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">${filters.price[0]}</span>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.price[1]}
              onChange={(e) => handlePriceChange([filters.price[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-600">${filters.price[1]}</span>
          </div>
        </div>
        
        {/* Availability */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="flex flex-wrap gap-2">
            {availabilityOptions.map(option => (
              <button
                key={option}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.availability === option 
                    ? 'bg-cyan-400 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleAvailabilityChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* Distance */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Distance (miles): {filters.distance}</h4>
          <input
            type="range"
            min="1"
            max="100"
            value={filters.distance}
            onChange={handleDistanceChange}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
        
        {/* Apply Filters Button */}
        <button className="w-full bg-cyan-400 text-white py-2 rounded-md hover:bg-cyan-500 transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;