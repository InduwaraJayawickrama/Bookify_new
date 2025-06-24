import React from "react";
import Button from "../ui/button";
import "../../styles/Home.css";

const Footer = () => {
    return (
    <div className="bg-gray-100">

        <footer className="border-t py-12 px-6">
                <div className="max-w-6xl mx-auto w-[95%] rounded-lg bg-gradient-to-r from-teal-100 to-teal-50 p-40">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                    <h3 className="font-bold text-lg mb-4">Bookify</h3>
                    <p className="text-gray-600 mb-4">The future of booking systems</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">Facebook</a>
                    </div>
                    </div>
                    <div>
                    <h3 className="font-bold mb-4">Menu</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-gray-600 hover:text-blue-500">Home</a></li>
                        <li><a href="/pricing" className="text-gray-600 hover:text-blue-500">Pricing</a></li>
                        <li><a href="/customers" className="text-gray-600 hover:text-blue-500">Customers</a></li>
                        <li><a href="/contact-us" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="/login" className="text-gray-600 hover:text-blue-500">Login</a></li>
                        <li><a href="/sign-up" className="text-gray-600 hover:text-blue-500">Sign Up</a></li>
                        <li><a href="/privacy" className="text-gray-600 hover:text-blue-500">Privacy</a></li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-bold mb-4">Subscribe Our Newsletter</h3>
                    <p className="text-gray-600 mb-4">Stay up to date with our latest features</p>
                    <div className="flex">
                        <input 
                        type="email" 
                        placeholder="Enter your email..." 
                        className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-l-none">
                        Subscribe
                        </Button>
                    </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-8 pt-8 border-t text-center text-gray-500">
                    <p>© 2025 Your Company Name. All rights reserved.</p>
                </div>
            </div>
         </footer>

    </div>
    );
}

export default Footer;