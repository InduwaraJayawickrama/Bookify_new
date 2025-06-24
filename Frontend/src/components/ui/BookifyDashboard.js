import React, { useState } from 'react';

import CommonCategoryView from '../../app/booking/CommonCategoryView';
import AboutCategoryView from '../../app/booking/AboutCategoryView';
import DoctorCategoryView from '../../app/booking/DoctorCategoryView';
import FilterComponent from '../../app/booking/FilterComponent';
import FitnessCoachCategoryView from '../../app/booking/FitnessCoachCategoryView';
import TeacherCategoryView from '../../app/booking/TeacherCategoryView';
import Navigation from './navigation';


const BookifyDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Common');
  
  const categories = [
    'Common',
    'Doctor',
    'Teacher',
    'Fitness Coach',
    'About',
    'Filter'
  ];
  
  // Function to render the appropriate component based on selected category
  const renderCategoryView = () => {
    switch(selectedCategory) {
      case 'Common':
        return <CommonCategoryView />;
      case 'Doctor':
        return <DoctorCategoryView />;
      case 'Teacher':
        return <TeacherCategoryView />;
      case 'Fitness Coach':
        return <FitnessCoachCategoryView />;
      case 'About':
        return <AboutCategoryView />;
      case 'Filter':
        return <FilterComponent />;
      default:
        return <DoctorCategoryView />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navigation/>

      {/* Main Content */}
      <section className="px-44 py-5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-64 mr-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-3xl font-bold mb-6">Details</h2>
                
                {/* Category Buttons */}
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`w-full py-2 px-4 rounded-md text-center transition-all ${
                        selectedCategory === category
                          ? 'bg-cyan-400 text-white'
                          : 'bg-blue-100 text-gray-800 hover:bg-blue-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      {(category ==='Doctor'|| category === 'Teacher' || category === 'Fitness Coach' || category === 'About' || category === 'Filter'
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content Area - Dynamic based on selected category */}
            <div className="flex-1">
              {renderCategoryView()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookifyDashboard;