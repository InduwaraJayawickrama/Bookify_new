import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Home/Home";
import LoginForm from "./app/Login/LoginForm";
import RegisterForm from "./app/signUp/RegisterForm";
import SignUpCommon from "./app/signUp/SignUpCommon";
import SignUp1 from "./app/signUp/SignUp1";
import Account1 from "./app/account/Account1";
import Review from "./app/Home/review";
import Community from "./app/Home/community";
import Service from "./app/Home/service";
import Contact from "./app/Home/contact";
import BookifyDashboard from "./components/ui/BookifyDashboard";
import FristPage from "./app/account/serviceProvider/fristPage";
import ClientBookingPage from "./app/account/client/clientBookingPage";
import BookifyApp from "./app/payment/BookifyApp";
import AboutCategoryView from "./app/booking/AboutCategoryView";
import DoctorCategoryView from "./app/booking/DoctorCategoryView";
import AccountSettings from "./app/account/serviceProvider/AccountSettings";
import AccountSettings1 from "./app/account/client/AccountSettings1";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/Consumer/login"
              element={<LoginForm userType="consumer" />}
            />
            <Route
              path="/service-provider/login"
              element={<LoginForm userType="service" />}
            />
            <Route
              path="/reset-password"
              element={<LoginForm userType="consumer" resetPassword={true} />}
            />
            <Route
              path="/reset-passwords"
              element={<LoginForm userType="service" resetPassword={true} />}
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/signupcommon" element={<SignUpCommon />} />
            <Route path="/signup1" element={<SignUp1 />} />
            <Route path="/account1" element={<Account1 />} />
            <Route path="/review" element={<Review />} />
            <Route path="/community" element={<Community />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookifydashboard" element={<BookifyDashboard />} />
            <Route path="/firstpage" element={<FristPage />} />
            <Route path="/clientbookingpage" element={<ClientBookingPage />} />
            <Route path="/bookifyApp" element={<BookifyApp />} />
            <Route path="/about" element={<AboutCategoryView />} />
            <Route path="/doctorcategoryview" element={<DoctorCategoryView />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="/accountsettings1" element={<AccountSettings1 />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3002}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
