import React, { useState, useEffect, useRef } from "react";
import "../../styles/Home.css";
import image1 from "../../images/1ae6e703-2e7a-4be5-9ca1-13a2cdd82738.png";
import image2 from "../../images/14ac423b-f383-4ab5-b624-4fb57e99b7ef.webp";
import image3 from "../../images/622e4649-090b-4f8f-bee7-9c607d3f8732.webp";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  const slideInterval = useRef(null);
  const slideDelay = 5000;

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    startAutoSlide();
  }, [currentSlide]);

  const startAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, slideDelay);
  };

  const pauseAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const nextSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    pauseAutoSlide();
    setCurrentSlide(index);
  };

  const images = [image1, image2, image3];

  return (
    <div className="bg-gray-100">
      <section className="px-6 py-16 md:py-24 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center  w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50">
          <div
            className="relative w-full h-[450px] md:h-[500px] overflow-hidden rounded-lg"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                  currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
              >
                <img
                  src={image}
                  className="w-full h-full object-cover rounded-lg"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}

            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
              {[0, 1, 2].map((slideIndex) => (
                <button
                  key={slideIndex}
                  type="button"
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === slideIndex
                      ? "bg-blue-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(slideIndex)}
                  aria-current={currentSlide === slideIndex ? "true" : "false"}
                  aria-label={`Slide ${slideIndex + 1}`}
                ></button>
              ))}
            </div>

            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={prevSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white group-focus:outline-none transition-all">
                <svg
                  className="w-4 h-4 text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>

            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={nextSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white group-focus:outline-none transition-all">
                <svg
                  className="w-4 h-4 text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          <div className="order-2 md:order-1 items-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Step into the <span className="text-3xl text-black">----</span>
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-blue-500">future</span> of{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                B
              </span>
              ooking systems
            </h1>
            <p className="text-gray-600 mb-8">
              Streamline your appointments, maximize efficiency, and enhance
              client satisfaction with our intuitive booking platform.
            </p>
            <div className="space-x-4 items-center justify-start">
              <Link
                to="/signupcommon"
                className="bg-blue-500 hover:bg-blue-600 text-white text-center p-4 rounded-3xl"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-center p-4 rounded-3xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider;
