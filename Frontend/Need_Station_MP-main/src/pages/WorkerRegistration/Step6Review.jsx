import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Briefcase, CheckCircle, DollarSign, ChevronLeft, ChevronRight, CheckSquare, AlertTriangle, Loader } from 'lucide-react';
import axios from 'axios';

export default function WorkerProfileSummary({ workerId, prev }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workerData, setWorkerData] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  
  useEffect(() => {
    if (!workerId) {
      setError("Worker ID is required");
      setLoading(false);
      return;
    }
    
    const fetchWorkerDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/worker/details/${workerId}`);
        setWorkerData(response.data);
        console.log("Worker details:", response.data);
        
        // Detailed debug logging for profile image
        console.log("Profile Image URL:", response.data.profileImageUrl);
        console.log("All available fields:", Object.keys(response.data).join(', '));
        console.log("Profile Image URL type:", typeof response.data.profileImageUrl);
        
        if (!response.data.profileImageUrl) {
          console.warn("Profile image URL is missing or null");
        }
      } catch (error) {
        console.error("Error fetching worker details:", error);
        setError("Failed to load worker details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkerDetails();
  }, [workerId, API_URL]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.post(`${API_URL}/worker/register/submit?workerId=${workerId}`);
      console.log("Registration submitted successfully:", response.data);
      
      // Clean up the temporary local profile image URL from storage
      // since we've now completed registration and have the cloud storage version
      localStorage.removeItem('tempProfileImageUrl');
      console.log("Removed temporary profile image from local storage");
      
      // Show success screen instead of redirecting
      setSubmitSuccess(true);
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      setError(
        error.response?.data?.message || 
        "There was an error completing your registration. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  // Navigate to the helper overview page
  const goToHelperOverview = () => {
    navigate('/helper/overview');
  };
  
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
  
  // Success screen component
  const SuccessScreen = () => (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-teal-400 mb-4">Registration Complete!</h1>
        <p className="text-gray-300 mb-8">
          Congratulations! Your worker registration has been successfully submitted. You're now ready to start your journey as a helper on our platform.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={goToHelperOverview}
            className="w-full py-4 px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold transition-all flex items-center justify-center"
          >
            <Briefcase className="mr-2" size={20} />
            Go to Helper Overview
          </button>
          <button
            onClick={() => navigate('/helper/overview')}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-medium transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // If success screen should be shown, render it instead of the review form
  if (showSuccessScreen) {
    return <SuccessScreen />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-teal-400">Profile Summary</h1>
        
        <div className="bg-yellow-100 text-amber-800 p-4 my-6 mx-auto max-w-3xl rounded-lg flex items-center justify-center">
          <span className="mr-2">✓</span>
          <span>Review your information and submit to complete your profile!</span>
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
        {loading ? (
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8 flex justify-center items-center">
            <Loader className="animate-spin" size={40} color="#2dd4bf" />
            <p className="ml-3 text-white">Loading your information...</p>
          </div>
        ) : error ? (
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8 flex flex-col items-center">
            <AlertTriangle size={60} color="#f43f5e" />
            <p className="mt-4 text-white text-center">{error}</p>
            <button 
              onClick={prev} 
              className="mt-6 bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-md"
            >
              Go Back
            </button>
          </div>
        ) : submitSuccess ? (
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-8 flex flex-col items-center">
            <CheckSquare size={60} color="#10b981" />
            <h2 className="mt-4 text-white text-xl font-bold">Registration Complete!</h2>
            <p className="mt-2 text-gray-300 text-center">Your registration has been submitted successfully. You will be redirected shortly.</p>
          </div>
        ) : (
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
                        {/* Use the local image URL first, then fallback to server data */}
                        {(() => {
                          // Attempt to get local image URL from localStorage
                          const localImageUrl = localStorage.getItem('tempProfileImageUrl');
                          
                          if (localImageUrl) {
                            console.log("Using local profile image URL:", localImageUrl);
                            return (
                              <img 
                                src={localImageUrl} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.error("Local image failed to load, trying server image");
                                  e.target.onerror = null; // Prevent infinite error loop
                                  
                                  // Try loading from server URL instead
                                  if (workerData?.profileImageUrl) {
                                    e.target.src = workerData.profileImageUrl;
                                  } else {
                                    e.target.style.display = 'none';
                                    e.target.parentNode.classList.add('fallback-icon-visible');
                                  }
                                }}
                              />
                            );
                          } else if (workerData?.profileImageUrl || workerData?.profilePicture || workerData?.profileImage || workerData?.imageUrl) {
                            const imageUrl = workerData.profileImageUrl || workerData.profilePicture || workerData.profileImage || workerData.imageUrl;
                            console.log("Using server profile image URL:", imageUrl);
                            return (
                              <img 
                                src={imageUrl} 
                                alt="Profile" 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  console.error("Server image failed to load");
                                  e.target.onerror = null; // Prevent infinite error loop
                                  e.target.src = ''; // Clear the src
                                  e.target.style.display = 'none'; // Hide the img element
                                  e.target.parentNode.classList.add('fallback-icon-visible'); // Show fallback icon
                                }}
                              />
                            );
                          } else {
                            return <User size={48} className="text-gray-400" />;
                          }
                        })()} {/* Self-executing function */}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400">Full Name</p>
                        <p className="text-white font-medium">{workerData?.fullName || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Gender</p>
                        <p className="text-white font-medium">{workerData?.gender || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Date of Birth</p>
                        <p className="text-white font-medium">{workerData?.dob || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">Contact Number</p>
                      <p className="text-white font-medium">
                        {workerData?.phone || 'Not provided'} 
                        {workerData?.otpVerified && <span className="text-green-400 text-sm">(Verified)</span>}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Email Address</p>
                      <p className="text-white font-medium">{workerData?.email || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">WhatsApp Number</p>
                      <p className="text-white font-medium">{workerData?.whatsappNumber || 'Not provided'}</p>
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
                    <p className="text-white font-medium">{workerData?.currentAddress || 'Not provided'}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400">City</p>
                      <p className="text-white font-medium">{workerData?.city || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Pincode</p>
                      <p className="text-white font-medium">{workerData?.pincode || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Areas/Cities you can serve</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workerData?.serviceAreas ? (
                        typeof workerData.serviceAreas === 'string' && workerData.serviceAreas.trim() !== '' ? (
                          workerData.serviceAreas.split(',').map((area, index) => (
                            <span key={index} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                              {area.trim()}
                            </span>
                          ))
                        ) : Array.isArray(workerData.serviceAreas) && workerData.serviceAreas.length > 0 ? (
                          workerData.serviceAreas.map((area, index) => (
                            <span key={index} className="bg-gray-700 text-white px-4 py-2 rounded-md">
                              {area}
                            </span>
                          ))
                        ) : <span className="text-gray-400">No service areas specified</span>
                      ) : (
                        <span className="text-gray-400">No service areas specified</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Open to travel?</p>
                    <p className="text-white font-medium">
                      {workerData?.openToTravel ? 'Yes' : workerData?.openToTravel === false ? 'No' : 'Not specified'}
                    </p>
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
                      {workerData?.services ? (
                        (() => {
                          try {
                            // Determine the format of services data
                            let servicesObj;
                            if (typeof workerData.services === 'string') {
                              // Handle JSON string
                              if (workerData.services.startsWith('{') || workerData.services.startsWith('[')) {
                                servicesObj = JSON.parse(workerData.services);
                              } 
                              // Handle comma-separated string
                              else if (workerData.services.includes(',')) {
                                const serviceNames = workerData.services.split(',').map(s => s.trim());
                                return serviceNames.map((name, idx) => (
                                  <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                    {name}
                                  </span>
                                ));
                              }
                              // Single service name
                              else if (workerData.services.trim() !== '') {
                                return (
                                  <span className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                    {workerData.services.trim()}
                                  </span>
                                );
                              }
                            } else if (typeof workerData.services === 'object') {
                              servicesObj = workerData.services;
                            }

                            // If we have an object with boolean values
                            if (servicesObj && typeof servicesObj === 'object' && !Array.isArray(servicesObj)) {
                              const enabledServices = [];
                              
                              // Get all keys where value is true
                              Object.keys(servicesObj).forEach(key => {
                                if (servicesObj[key] === true) {
                                  enabledServices.push(key);
                                }
                              });
                              
                              if (enabledServices.length === 0) {
                                return <span className="text-gray-400">No services selected</span>;
                              }
                              
                              // Format service names for display (camelCase to Title Case)
                              return enabledServices.map((service, idx) => {
                                // Convert camelCase to Title Case (e.g., furnitureAssembly → Furniture Assembly)
                                const formattedService = service
                                  .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                                  .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
                                  
                                return (
                                  <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md">
                                    {formattedService}
                                  </span>
                                );
                              });
                            }
                            
                            // For array format
                            if (Array.isArray(servicesObj)) {
                              return servicesObj.map((service, idx) => (
                                <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                  {typeof service === 'string' ? service : JSON.stringify(service)}
                                </span>
                              ));
                            }
                            
                            // Fallback
                            return <span className="text-gray-400">Services format not recognized</span>;
                          } catch (e) {
                            console.error("Error parsing services:", e);
                            return <span className="text-gray-400">Error displaying services</span>;
                          }
                        })()
                      ) : (
                        <span className="text-gray-400">No services specified</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400">Years of Experience</p>
                      <p className="text-white font-medium">{workerData?.experience || 'Not provided'}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Work Type Preference</p>
                      <p className="text-white font-medium">{workerData?.workType || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Availability</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                      {workerData?.availability ? (
                        (() => {
                          try {
                            // Check if it's a string that needs parsing
                            const availData = typeof workerData.availability === 'string' ? 
                              JSON.parse(workerData.availability) : workerData.availability;
                            
                            // Days of the week
                            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                            
                            return days.map(day => (
                              <div key={day} className={`px-3 py-2 rounded-md ${availData[day] ? 'bg-teal-700 text-white' : 'bg-gray-800 text-gray-400'}`}>
                                <span className="capitalize">{day}</span>
                                <span className="ml-2">{availData[day] ? '✓' : '✗'}</span>
                              </div>
                            ));
                          } catch (e) {
                            return <span className="text-gray-400">Availability format not recognized</span>;
                          }
                        })()
                      ) : (
                        <span className="text-gray-400">No availability specified</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Languages Spoken</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workerData?.languages ? (
                        (() => {
                          try {
                            // Determine the format of languages data
                            let languagesObj;
                            if (typeof workerData.languages === 'string') {
                              // Handle JSON string
                              if (workerData.languages.startsWith('{') || workerData.languages.startsWith('[')) {
                                languagesObj = JSON.parse(workerData.languages);
                              } 
                              // Handle comma-separated string
                              else if (workerData.languages.includes(',')) {
                                const languageNames = workerData.languages.split(',').map(s => s.trim());
                                return languageNames.map((name, idx) => (
                                  <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                    {name}
                                  </span>
                                ));
                              }
                              // Single language name
                              else if (workerData.languages.trim() !== '') {
                                return (
                                  <span className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                    {workerData.languages.trim()}
                                  </span>
                                );
                              }
                            } else if (typeof workerData.languages === 'object') {
                              languagesObj = workerData.languages;
                            }

                            // If we have an object with boolean values
                            if (languagesObj && typeof languagesObj === 'object' && !Array.isArray(languagesObj)) {
                              const enabledLanguages = [];
                              
                              // Get all keys where value is true
                              Object.keys(languagesObj).forEach(key => {
                                if (languagesObj[key] === true) {
                                  enabledLanguages.push(key);
                                }
                              });
                              
                              if (enabledLanguages.length === 0) {
                                return <span className="text-gray-400">No languages selected</span>;
                              }
                              
                              // Format language names for display (capitalize first letter)
                              return enabledLanguages.map((language, idx) => {
                                // Capitalize first letter
                                const formattedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
                                  
                                return (
                                  <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md">
                                    {formattedLanguage}
                                  </span>
                                );
                              });
                            }
                            
                            // For array format
                            if (Array.isArray(languagesObj)) {
                              return languagesObj.map((language, idx) => (
                                <span key={idx} className="bg-teal-700 text-white px-4 py-2 rounded-md capitalize">
                                  {typeof language === 'string' ? language : JSON.stringify(language)}
                                </span>
                              ));
                            }
                            
                            // Fallback
                            return <span className="text-gray-400">Languages format not recognized</span>;
                          } catch (e) {
                            console.error("Error parsing languages:", e);
                            return <span className="text-gray-400">Error displaying languages</span>;
                          }
                        })()
                      ) : (
                        <span className="text-gray-400">No languages specified</span>
                      )}
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
                    <p className="text-gray-400">Aadhar Number</p>
                    <p className="text-white font-medium">
                      {workerData?.aadharNumber ? 
                        `${workerData.aadharNumber.substring(0, 4)}-XXXX-XXXX` : 
                        'Not provided'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">ID Proof</p>
                    {workerData?.idProofUrl ? (
                      <div className="mt-2">
                        <img 
                          src={workerData.idProofUrl} 
                          alt="ID Proof" 
                          className="h-32 object-contain rounded border border-gray-600" 
                        />
                      </div>
                    ) : (
                      <p className="text-white font-medium">Not uploaded</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Selfie with ID</p>
                    {workerData?.selfieWithIdUrl ? (
                      <div className="mt-2">
                        <img 
                          src={workerData.selfieWithIdUrl} 
                          alt="Selfie with ID" 
                          className="h-32 object-contain rounded border border-gray-600" 
                        />
                      </div>
                    ) : (
                      <p className="text-white font-medium">Not uploaded</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-400">Police Verification Status</p>
                    <p className="text-white font-medium">
                      {workerData?.policeVerificationStatus || 'Not provided'}
                    </p>
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
                    <p className="text-white font-medium">{workerData?.paymentMode || 'Not provided'}</p>
                  </div>
                  
                  {workerData?.paymentMode === 'UPI' && (
                    <div>
                      <p className="text-gray-400">UPI ID</p>
                      <p className="text-white font-medium">{workerData?.upiId || 'Not provided'}</p>
                    </div>
                  )}
                  
                  {workerData?.paymentMode === 'Bank Transfer' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-400">Bank Name</p>
                          <p className="text-white font-medium">{workerData?.bankName || 'Not provided'}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400">Account Number</p>
                          <p className="text-white font-medium">
                            {workerData?.accountNumber ? 
                              `XXXX-XXXX-${workerData.accountNumber.slice(-4)}` : 
                              'Not provided'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">IFSC Code</p>
                        <p className="text-white font-medium">{workerData?.ifscCode || 'Not provided'}</p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <p className="text-gray-400">PAN Card Number</p>
                    <p className="text-white font-medium">{workerData?.panCard || 'Not provided'}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-xl font-semibold text-teal-400 mb-3">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-400">Name</p>
                        <p className="text-white font-medium">{workerData?.emergencyContactName || 'Not provided'}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Contact Number</p>
                        <p className="text-white font-medium">{workerData?.emergencyContactNumber || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Navigation buttons */}
      <footer className="p-6">
        <div className="max-w-3xl mx-auto flex justify-between">
          {activeSection === sections[0] ? (
            <button
              onClick={prev}
              className="flex items-center px-6 py-3 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Previous Step
            </button>
          ) : (
            <button
              onClick={goToPreviousSection}
              className="flex items-center px-6 py-3 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
              <ChevronLeft className="mr-2" size={20} />
              Previous Section
            </button>
          )}
          
          {activeSection === sections[sections.length - 1] ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center px-6 py-3 rounded-md bg-teal-500 text-white hover:bg-teal-600"
            >
              {submitting ? 'Submitting...' : 'Complete Registration'}
              {!submitting && <CheckCircle className="ml-2" size={20} />}
            </button>
          ) : (
            <button
              onClick={goToNextSection}
              className="flex items-center px-6 py-3 rounded-md bg-teal-500 text-white hover:bg-teal-600"
            >
              Next Section
              <ChevronRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
