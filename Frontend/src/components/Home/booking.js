import React from "react";
import { Card, CardContent } from "../ui/card";
import image1 from "../../images/Rectangle 1085.png";
import image2 from "../../images/Rectangle 1082.png";
import image3 from "../../images/Rectangle 1086.png";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/bookifydashboard");
    } else {
      navigate("/signupcommon");
    }
  };

  return (
    <div className="bg-gray-100">
      <section className="py-12 px-6 bg-gray-100 shadow-md">
        <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 px-5 gap-6">
              <h2 className="text-2xl text-left font-bold items-center">
                Booking Service
              </h2>
              <p className="text-gray-600 text-left px-2 py-8">
                Choose from our popular service categories
                <button
                  onClick={handleBookingClick}
                  className="bg-teal-400 hover:bg-teal-600 text-white text-sm px-5 py-2 rounded-xl ml-2"
                >
                  Booking
                </button>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={image1}
                  alt="Medical Consultation"
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="font-bold mb-2">Doctors</h3>
                  <p className="text-gray-600">
                    A patient booking a doctor's appointment for a medical
                    consultation
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={image2}
                  alt="Tutoring Session"
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="font-bold mb-2">Teachers</h3>
                  <p className="text-gray-600">
                    A student scheduling a tutoring session with a lecturer
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={image3}
                  alt="Fitness Training"
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="font-bold mb-2">Fitness Coach</h3>
                  <p className="text-gray-600">
                    A trainee reserving a time slot with a fitness coach
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
