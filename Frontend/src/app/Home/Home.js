import React from "react";
import "../../styles/Home.css";
import Navigation from "../../components/ui/navigation";
import Feedback from "../../components/Home/feedback";
import Footer from "../../components/Home/footer";
import Booking from "../../components/Home/booking";
import CardHome from "../../components/Home/card_home";
import Slider from "../../components/Home/slider";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navigation />
      <Slider />
      <CardHome />
      <Booking />
      <Feedback />
      <div className="items-center">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
