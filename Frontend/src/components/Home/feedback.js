import { Card, CardContent } from "../ui/card";
import "../../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFeedback } from "../../services/reviewApi";
import Slider from "react-slick";

const Feedback = () => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    if (isAuthenticated) {
      navigate("/review");
    } else {
      navigate("/signupcommon");
    }
  };

  const [reviews, setReviews] = useState([]);

  // Fetch feedback from the API
  useEffect(() => {
    const getFeedback = async () => {
      const data = await fetchFeedback();
      setReviews(data);
    };
    getFeedback();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto md:grid-cols-2 gap-10 items-center w-full rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl text-left font-bold mb-2 px-3">
              Feedback...
            </h2>
            <p className="text-gray-600 text-left px-5 py-8">
              What our users are saying
              <button
                onClick={handleFeedbackClick}
                className="bg-teal-400 hover:bg-teal-600 text-white text-sm px-5 py-2 rounded-xl ml-2"
              >
                Add Feedback
              </button>
            </p>
          </div>
          <div className="p-4 md:p-8 lg:p-8">
            {reviews.length > 0 ? (
              <Slider {...sliderSettings}>
                {reviews.map((review) => (
                  <Card
                    key={review.responseDate || review.id}
                    className="shadow-lg rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 mx-6 transform hover:scale-105 transition duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full mb-4 overflow-hidden shadow-lg border-4 border-blue-300">
                          <img
                            src={review.image || "https://via.placeholder.com/150"}
                            alt={`${review.name || "Anonymous"}'s profile`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-xl text-blue-700 mb-2">
                          {review.name || "Anonymous"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 italic">
                          "{review.comments}"
                        </p>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-6 h-6 ${
                                review.rating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Slider>
            ) : (
              <p className="text-gray-600 text-center">No feedback available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
