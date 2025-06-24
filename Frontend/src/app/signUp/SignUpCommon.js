import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/button";
import "../../styles/Home.css";
import image1 from "../../images/1ae6e703-2e7a-4be5-9ca1-13a2cdd82738.png";
import image2 from "../../images/14ac423b-f383-4ab5-b624-4fb57e99b7ef.webp";

const SignUpCommon = () => {
  return (
    <div className="bg-white min-h-screen items-center justify-center w-[100%] h-[100%]">
      <nav className="sticky top-0 z-10 flex justify-between items-center p-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full h-full rounded-lg border-b-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              BOOKIFY
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-blue-500 font-medium">
              Home
            </Link>
            <Link
              to="/review"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Review
            </Link>
            <Link
              to="/community"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Community
            </Link>
            <Link
              to="/service"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </nav>

      <section className="py-10 px-5 bg-gray-50 flex justify-center">
        <div className="max-w-6xl w-full rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-5">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Consumer Section */}
            <div className="bg-white shadow-lg rounded-tl-3xl rounded-tr-3xl p-6 flex-1 flex flex-col items-center">
              <div
                className="h-72 w-full bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: `url(${image1})` }}
              ></div>
              <div className="bg-teal-300 shadow-lg rounded-lg py-2 px-8 flex-1 flex flex-col items-center">
                <h2 className="text-lg font-semibold text-blue-500">
                  Consumer
                </h2>
                <p className="text-gray-700">Book your Service!</p>
                <Link to="/register?type=consumer">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>

            {/* Service Provider Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 flex flex-col items-center">
              <div className="bg-teal-300 shadow-lg rounded-lg py-2 px-8 flex-1 flex flex-col items-center">
                <h2 className="text-lg font-semibold text-blue-500">
                  Servicer
                </h2>
                <p className="text-gray-700">Add your Service!</p>
                <Link to="/register?type=service">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
              <div
                className="h-72 w-full bg-cover bg-center rounded-lg mt-4"
                style={{ backgroundImage: `url(${image2})` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpCommon;
