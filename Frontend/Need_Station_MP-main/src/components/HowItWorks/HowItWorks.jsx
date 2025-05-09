import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  // Function to check if user is logged in (using localStorage)
  const isUserLoggedIn = () => {
    return localStorage.getItem('token') !== null;
  };

  // Handle Get Started button click
  const handleGetStarted = () => {
    if (isUserLoggedIn()) {
      // If logged in, scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If not logged in, redirect to signup page
      navigate('/signup');
    }
  };

  return (
    <section className="text-white py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-center text-4xl font-semibold mb-10">How it works</h2>
      
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Left side with steps */}
        <div className="w-full lg:w-1/2">
          {/* Step 1 */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold">Choose a Tasker by price, skills, and reviews</h3>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold">Schedule a Tasker as early as today.</h3>
            </div>
          </div>
    
          {/* Step 3 */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold">Chat, pay, tip, and review all in one place.</h3>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="mt-6">
            <button 
              onClick={handleGetStarted}
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-3 px-8 rounded-md transition duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
        
        {/* Right side with image */}
        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden">
          <img 
            src="/images/how-it-works.jpg" 
            alt="People discussing tasks" 
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x300?text=How+It+Works';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;