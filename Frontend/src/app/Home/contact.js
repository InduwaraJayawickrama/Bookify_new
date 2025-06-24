import React, { useState } from 'react';
import Navigation from "../../components/ui/navigation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl items-center mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Navigation/>
      <section className="bg-cyan-50 p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Contact Us</h2>
        {formSubmitted ? (
          <p className="text-green-500 text-center">Thank you! Your message has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Your Name" 
              className="w-full p-2 border rounded" 
              required 
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="Your Email" 
              className="w-full p-2 border rounded" 
              required 
            />
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="Your Phone" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleInputChange} 
              placeholder="Subject" 
              className="w-full p-2 border rounded" 
            />
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleInputChange} 
              placeholder="Your Message" 
              className="w-full p-2 border rounded h-32" 
              required 
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Contact;
