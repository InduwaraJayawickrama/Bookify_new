// Community.jsx
import Navigation from "../../components/ui/navigation";
import React, { useState } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      date: "March 15, 2025",
      content: "Just had an amazing experience using the new booking system! Everything was so intuitive and fast.",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: "David Chen",
      avatar: "/api/placeholder/40/40",
      date: "March 14, 2025",
      content: "Has anyone used the mobile app version? Is it as good as the web version?",
      likes: 17,
      comments: 8
    },
    {
      id: 3,
      author: "Emily Wilson",
      avatar: "/api/placeholder/40/40",
      date: "March 13, 2025",
      content: "Pro tip: You can save your favorite services for quicker booking next time. Made my life so much easier!",
      likes: 36,
      comments: 3
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("discussions");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      author: "Guest User",
      avatar: "/api/placeholder/40/40",
      date: "Today",
      content: newPost,
      likes: 0,
      comments: 0
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? {...post, likes: post.likes + 1} : post
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Navigation/>
      <section className="bg-cyan-50 p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Community</h1>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'discussions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('discussions')}
          >
            Discussions
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('events')}
          >
            Upcoming Events
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>
        
        {activeTab === 'discussions' && (
          <>
            {/* Create Post */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with the community..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  rows="3"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
            
            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center mr-4 hover:text-blue-500"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                      </svg>
                      {post.likes}
                    </button>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      {post.comments} comments
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      
      <section className="p-5 bg-cyan-50">
        {activeTab === 'events' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Community Events</h2>
            <div className="space-y-4 p-3">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-cyan-100">
                <h3 className="font-medium text-lg">User Experience Workshop</h3>
                <p className="text-gray-600 mb-2">March 25, 2025 • 2:00 PM - 4:00 PM</p>
                <p className="text-gray-700">Join us for a hands-on workshop about improving your booking experience.</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700 font-medium">RSVP Now</button>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-100">
                <h3 className="font-medium text-lg">Community Meetup</h3>
                <p className="text-gray-600 mb-2">April 10, 2025 • 6:00 PM - 8:00 PM</p>
                <p className="text-gray-700">Network with other users and share your experiences with our services.</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700 font-medium">RSVP Now</button>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-indigo-100">
                <h3 className="font-medium text-lg">Webinar: Advanced Booking Techniques</h3>
                <p className="text-gray-600 mb-2">April 17, 2025 • Online</p>
                <p className="text-gray-700">Learn how to make the most of our advanced booking features.</p>
                <button className="mt-2 text-blue-500 hover:text-blue-700 font-medium">Register</button>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="p-5 bg-cyan-50">
      {activeTab === 'resources' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Community Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-medium text-lg mb-2">Getting Started Guide</h3>
              <p className="text-gray-600 mb-3">New to our platform? This guide covers all the basics you need to know.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">Download PDF</a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-medium text-lg mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-3">Visual learner? Check out our step-by-step video guides.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">View Library</a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-medium text-lg mb-2">FAQ Database</h3>
              <p className="text-gray-600 mb-3">Find answers to the most common questions about our services.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">Browse FAQs</a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-medium text-lg mb-2">Community Forums</h3>
              <p className="text-gray-600 mb-3">Connect with other users, share tips, and get help from our community.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">Join Discussion</a>
            </div>
          </div>
        </div>
      )}
      </section>
    </div>
  );
};

export default Community;