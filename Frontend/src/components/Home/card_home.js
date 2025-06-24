import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import "../../styles/Home.css";

const CardHome = () => {
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

  return (
    <div className="bg-gray-100">
      <section className="py-12 px-6 shadow-md">
        <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center w-[95%] h-[90%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-20">
          <div>
            <div className="max-w-6xl mx-auto pb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaUser className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Total Clients</p>
                          <p className="text-2xl font-bold">5,457</p>
                        </div>
                      </div>
                      <div className="border bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+16.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaCalendarAlt className="text-green-500 text-xl" />
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Service Providers</p>
                          <p className="text-2xl font-bold">5,457</p>
                        </div>
                      </div>
                      <div className="border bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+16.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaMoneyBillWave className="text-purple-500 text-xl" />
                    </div>
                    <div>
                      <div className="items-center space-x-2 px-10">
                        <div>
                          <p className="text-gray-500">Total Revenue</p>
                          <p className="text-2xl font-bold">Rs.100,555.00</p>
                        </div>
                      </div>
                      <div className="border bg-slate-200 text-left">
                        <div className="">
                          <span className="text-green-500 text-sm">+10.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <Card className="w-full">
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Client Login in Weekly
                    </h3>
                    <span className="text-green-500 text-sm">
                      +10.5% from last period
                    </span>
                  </div>
                  <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardHome;
