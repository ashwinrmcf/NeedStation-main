import { useState } from 'react';
import { User, MapPin, Briefcase, CheckCircle, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkerProfileSummary() {
  const [activeSection, setActiveSection] = useState('basic');
  
  const sections = ['basic', 'location', 'professional', 'skill', 'payment'];
  
  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };
  
  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-teal-400">Profile Summary</h1>
        
        <div className="bg-yellow-100 text-amber-800 p-4 my-6 mx-auto max-w-3xl rounded-lg flex items-center justify-center">
          <span className="mr-2">✓</span>
          <span>Few more steps to complete your profile!</span>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center space-x-4 mt-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-4 h-4 rounded-full ${
                activeSection === section ? 'bg-teal-400' : 'bg-gray-600'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>
      </header>
      
      {/* Content area */}
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8">
          {/* Basic Information */}
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <div className="flex items-center text-teal-400 mb-4">
                <User className="mr-2" />
                <h2 className="text-2xl font-semibold">Basic Information</h2>
                <span className="text-white ml-2">Details</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-teal-400">
                      <img src="https://lumiere-a.akamaihd.net/v1/images/e12c6b042ba46e43697492be6bce82e81409abd7.jpeg?region=0,0,450,450&width=320" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Full Name</p>
                      <p className="text-white font-medium">Rahul Sharma</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Gender</p>
                      <p className="text-white font-medium">Male</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Date of Birth</p>
                      <p className="text-white font-medium">15 Oct 1992</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Contact Number</p>
                    <p className="text-white font-medium">+91 9876543210 <span className="text-green-400 text-sm">(Verified)</span></p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Email Address</p>
                    <p className="text-white font-medium">rahul.sharma@example.com</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">WhatsApp Number</p>
                    <p className="text-white font-medium">+91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Location Details */}
          {activeSection === 'location' && (
            <div className="space-y-6">
              <div className="flex items-center text-teal-400 mb-4">
                <MapPin className="mr-2" />
                <h2 className="text-2xl font-semibold">Location</h2>
                <span className="text-white ml-2">Details</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400">Current Address</p>
                  <p className="text-white font-medium">123, Sunshine Apartments, MG Road</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400">City</p>
                    <p className="text-white font-medium">Mumbai</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Pincode</p>
                    <p className="text-white font-medium">400001</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400">Areas/Cities you can serve</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Mumbai', 'Pune'].map((city) => (
                      <span key={city} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400">Open to travel?</p>
                  <p className="text-white font-medium">Yes</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Professional Details */}
          {activeSection === 'professional' && (
            <div className="space-y-6">
              <div className="flex items-center text-teal-400 mb-4">
                <Briefcase className="mr-2" />
                <h2 className="text-2xl font-semibold">Professional</h2>
                <span className="text-white ml-2">Details</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400">Services Offered</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Cleaning', 'Plumbing', 'Electrician'].map((service) => (
                      <span key={service} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400">Years of Experience</p>
                    <p className="text-white font-medium">5 years</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Work Type Preference</p>
                    <p className="text-white font-medium">Full-time</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400">Availability</p>
                  <p className="text-white font-medium">Monday to Friday, 9:00 AM - 6:00 PM</p>
                </div>
                
                <div>
                  <p className="text-gray-400">Languages Spoken</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Hindi', 'English', 'Marathi'].map((language) => (
                      <span key={language} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Skill Verification */}
          {activeSection === 'skill' && (
            <div className="space-y-6">
              <div className="flex items-center text-teal-400 mb-4">
                <CheckCircle className="mr-2" />
                <h2 className="text-2xl font-semibold">Skill</h2>
                <span className="text-white ml-2">Verification</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400">Certificates</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-700 p-4 rounded-md ">
                      <p className="text-white">Plumbing Certificate</p>
                      <p className="text-green-400 text-sm">Verified</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-md">
                      <p className="text-white">Electrical Safety Certificate</p>
                      <p className="text-green-400 text-sm">Verified</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400">ID Proof</p>
                    <div className="bg-gray-700 p-4 rounded-md mt-2">
                      <p className="text-white">Aadhaar Card</p>
                      <p className="text-green-400 text-sm">Verified</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Selfie with ID</p>
                    <div className="bg-gray-700 p-4 rounded-md mt-2 flex items-center">
                      <div className="w-12 h-12 bg-gray-600 rounded-md mr-4"></div>
                      <p className="text-green-400 text-sm">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Information */}
          {activeSection === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center text-teal-400 mb-4">
                <DollarSign className="mr-2" />
                <h2 className="text-2xl font-semibold">Payment</h2>
                <span className="text-white ml-2">Information</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400">Preferred Payment Mode</p>
                  <p className="text-white font-medium">UPI</p>
                </div>
                
                <div>
                  <p className="text-gray-400">UPI ID</p>
                  <p className="text-white font-medium">rahul.sharma@upi</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400">Bank Name</p>
                    <p className="text-white font-medium">State Bank of India</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Account Number</p>
                    <p className="text-white font-medium">XXXX XXXX 1234</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400">IFSC Code</p>
                  <p className="text-white font-medium">SBIN0001234</p>
                </div>
                
                <div>
                  <p className="text-gray-400">PAN Card Number</p>
                  <p className="text-white font-medium">ABCDE1234F</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Navigation buttons */}
      <footer className="p-6">
        <div className="max-w-3xl mx-auto flex justify-between">
          <button
            onClick={goToPreviousSection}
            disabled={activeSection === sections[0]}
            className={`flex items-center px-6 py-3 rounded-md ${
              activeSection === sections[0]
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          
          <button
            onClick={goToNextSection}
            disabled={activeSection === sections[sections.length - 1]}
            className={`flex items-center px-6 py-3 rounded-md ${
              activeSection === sections[sections.length - 1]
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            }`}
          >
            Next
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}