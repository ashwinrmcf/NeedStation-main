import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Calendar, Camera, Loader2, User, CheckCircle, RefreshCw
} from 'lucide-react';
import Translator from '../../components/Translator';

export default function Step1BasicInfo({ data, updateForm, next, workerId, updateWorkerId, imagePreviewUrls, setImagePreviewUrls, localProfileImageUrl, setLocalProfileImageUrl }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [verifiedWorkerId, setVerifiedWorkerId] = useState(null);
  
  // Use props for otpSent and otpVerified to maintain state across steps
  const { otpSent = false, otpVerified = false } = data;

  // Backend API URL - update this to your actual backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  // Initialize component state when mounting or data changes
  useEffect(() => {
    // Restore image preview
    if (imagePreviewUrls?.profilePicture) {
      setLocalProfileImageUrl(imagePreviewUrls.profilePicture);
    } else if (data.profilePicture) {
      if (typeof data.profilePicture === 'string' && data.profilePicture.includes('cloudinary.com')) {
        setLocalProfileImageUrl(data.profilePicture);
        setImagePreviewUrls(prev => ({ ...prev, profilePicture: data.profilePicture }));
      } else if (data.profilePicture instanceof File) {
        const localUrl = URL.createObjectURL(data.profilePicture);
        setLocalProfileImageUrl(localUrl);
        setImagePreviewUrls(prev => ({ ...prev, profilePicture: localUrl }));
        setProfilePicture(data.profilePicture);
      }
    }
    
    if (workerId && !verifiedWorkerId) {
      setVerifiedWorkerId(workerId);
    }
  }, [data.profilePicture, workerId, imagePreviewUrls, setImagePreviewUrls, setLocalProfileImageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating field:", name, "to value:", value);    // Update parent form data
    const updates = { [name]: value };
    
    // Reset OTP verification if phone number changes
    if (name === 'phone' && (data.otpSent || data.otpVerified)) {
      updates.otpSent = false;
      updates.otpVerified = false;
      setOtpCode('');
      setOtpError('');
    }
    
    updateForm(updates);
  };
  
  // Function to generate OTP using the Free OTP API
  const generateOtp = async () => {
    const { phone } = data;
    
    if (!phone || phone.length !== 10) {
      setOtpError('Please enter a valid 10-digit phone number');
      return;
    }
    
    setOtpLoading(true);
    setOtpError('');
    
    try {
      // First register the worker to get a worker ID
      if (!workerId && !verifiedWorkerId) {
        // Create worker data for registration
        const workerData = {
          fullName: data.fullName || "Temporary Name",  // Can be updated later
          gender: data.gender || "Other",
          dob: data.dob || "2000-01-01",
          phone: phone,
          email: data.email || "",
          whatsappNumber: data.whatsappNumber || ""
        };

        try {
          // Register the worker first using the new Free OTP API endpoint
          const registerResponse = await axios.post(`${API_URL}/workers/register/step1`, workerData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (registerResponse.data && registerResponse.data.workerId) {
            // Save the worker ID for OTP verification
            const newWorkerId = registerResponse.data.workerId;
            setVerifiedWorkerId(newWorkerId);
            if (updateWorkerId) {
              updateWorkerId(newWorkerId);
            }
            
            // Update parent form with OTP sent status
            updateForm({ otpSent: true });
            console.log('OTP sent successfully during registration');
            alert('OTP sent! Please check your phone for the verification code.');
          } else {
            setOtpError('Failed to register. Please check your information.');
          }
        } catch (registerError) {
          // Handle 409 Conflict error - Worker already exists with this phone number
          if (registerError.response && registerError.response.status === 409 && 
              registerError.response.data && registerError.response.data.workerId) {
            
            // Worker already exists, capture the existing workerId
            const existingWorkerId = registerError.response.data.workerId;
            setVerifiedWorkerId(existingWorkerId);
            if (updateWorkerId) {
              updateWorkerId(existingWorkerId);
            }
            
            // Now send OTP to the existing worker using resend endpoint
            const resendResponse = await axios.post(
              `${API_URL}/workers/resend-otp`,
              { workerId: existingWorkerId },
              { headers: { 'Content-Type': 'application/json' } }
            );
            
            if (resendResponse.data && resendResponse.data.sent) {
              updateForm({ otpSent: true });
              console.log('OTP sent to existing worker');
              alert('This phone number is already registered. OTP sent for verification!');
            } else {
              setOtpError('Failed to send OTP to existing account. Please try again.');
            }
          } else {
            // For other registration errors
            console.error('Registration error:', registerError);
            if (registerError.response && registerError.response.data && registerError.response.data.error) {
              setOtpError(registerError.response.data.error);
            } else {
              setOtpError('Failed to register. Please check your information and try again.');
            }
          }
        }
      } else {
        // If we already have a worker ID, resend the OTP
        const existingId = verifiedWorkerId || workerId;
        const response = await axios.post(`${API_URL}/workers/resend-otp`, {
          workerId: verifiedWorkerId
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.sent) {
          updateForm({ otpSent: true });
          console.log('OTP resent successfully');
          alert('OTP sent! Please check your phone for the verification code.');
        } else {
          setOtpError('Failed to send OTP. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      // Only get here for errors not caught in the inner try/catch
      if (error.response && error.response.data && error.response.data.error) {
        setOtpError(error.response.data.error);
      } else {
        setOtpError('Failed to send OTP. Please try again.');
      }
    } finally {
      setOtpLoading(false);
    }
  };
  
  // Function to verify OTP using the Free OTP API
  const verifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setOtpError('Please enter a valid OTP code');
      return;
    }
    
    setOtpLoading(true);
    setOtpError('');
    
    try {
      const verifyResponse = await axios.post(
        `${API_URL}/workers/verify-otp`,
        { 
          workerId: verifiedWorkerId || workerId,
          otp: otpCode 
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (verifyResponse.data && verifyResponse.data.verified) {
        // Update form data with verification status
        updateForm({ 
          otpVerified: true,
          otpSent: true  // Keep otpSent true when verified
        });
        setOtpError('');
        console.log('OTP verified successfully');
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setOtpError(error.response.data.error);
      } else {
        setOtpError('Failed to verify OTP. Please try again.');
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      const localUrl = URL.createObjectURL(file);
      
      // Store image preview URL in both local and parent state
      setLocalProfileImageUrl(localUrl);
      setImagePreviewUrls(prev => ({
        ...prev,
        profilePicture: localUrl
      }));
      
      // Also update parent form data with the file
      updateForm({
        profilePicture: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, gender, dob, phone, email, whatsappNumber } = data;

    console.log("Form data at submit:", data); // Debug log
    if (!fullName || fullName.trim() === "") {
      alert("Please enter your full name.");
      return;
    }
    if (!gender || !dob || !phone) {
      alert("Please fill all required fields before continuing");
      return;
    }
    
    // Check if phone verification is complete
    if (!otpVerified) {
      alert("Please verify your phone number before continuing.");
      return;
    }

    // If we already have a workerId and the basic info hasn't changed, skip submission
    if (workerId || verifiedWorkerId) {
      console.log("Worker already exists, skipping Step 1 submission");
      // Just proceed to next step without saving again
      next();
      return;
    }
    
    // Create FormData object
    const formData = new FormData();
    
    // Add profile picture - use "file" as the key to match backend @RequestParam("file")
    if (profilePicture) {
      formData.append("file", profilePicture);
    }
    
    // Create DTO for worker registration with explicit non-null values
    const workerData = {
      fullName: fullName || "",      // Ensure non-null values
      gender: gender || "",
      dob: dob || "2000-01-01",      // Default date if empty
      phone: phone || "",
      email: email || "",
      whatsappNumber: whatsappNumber || "",
      otpVerified: otpVerified      // Set based on actual verification status
    };
    
    console.log("Sending worker data:", workerData);
    
    // Append worker data as a plain JSON string
    formData.append("data", JSON.stringify(workerData));
    
    setLoading(true);
    
    try {
      // Create endpoint URL - ensure this matches your backend endpoint
      let url = `${API_URL}/worker/register/step1`;
      
      // Add workerId parameter if it exists
      if (verifiedWorkerId) {
        url += `?workerId=${verifiedWorkerId}`;
      }
      
      setLoading(true);
      console.log("Sending request to URL:", url);
      // Don't set Content-Type header manually, axios will set the correct boundary
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update workerId if it's a new registration
      if (response.data && response.data.workerId && updateWorkerId) {
        updateWorkerId(response.data.workerId);
      }
      
      // Continue to next step
      next();
    } catch (err) {
      console.error("Error saving basic information:", err);
      let errorMsg = "Failed to save information. Please try again.";
      
      // Try to extract more specific error message
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg = err.response.data.error;
      }
      
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // No cleanup effect needed anymore

  return (
    <form onSubmit={handleSubmit} className="min-h-screen md:w-full lg:w-full text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Register as a <span className="text-teal-400">worker</span>
        </h1>
        {/* Translation is now handled globally */}
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md inline-flex items-center mt-6 mb-10">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Few more steps to see your earnings!
        </div>

        <h2 className="text-3xl font-bold mb-0">Tell us about yourself!</h2>
        
        {/* Already registered link */}
        <div className="mt-4 text-center">
          <Link 
            to="/worker-login" 
            className="font-medium transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
            style={{ color: '#00E0B8' }}
          >
            Already registered? Login
          </Link>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-lg font-medium mb-2">
            What's your name?
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={data.fullName || ""}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
          />
          <p className="text-sm text-yellow-500 mt-1">
            Special characters like !@#$%^&*()_+=~. are not allowed
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium mb-2">Gender</label>
          <div className="grid grid-cols-3 gap-4">
            {['Male', 'Female', 'Other'].map((option) => (
              <label key={option}
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition ${
                  data.gender === option
                    ? 'bg-teal-500 border-teal-600 text-white'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={data.gender === option}
                  onChange={handleInputChange}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-lg font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={data.dob || ''}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
          />
        </div>

        {/* Profile Picture (optional) */}
        <div>
          <label className="block text-lg font-medium mb-2">Profile Picture (optional)</label>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              {(localProfileImageUrl || imagePreviewUrls?.profilePicture || data.profilePicture) ? (
                <img
                  src={localProfileImageUrl || imagePreviewUrls?.profilePicture || data.profilePicture}
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover border-2 border-teal-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-600">
                  <User size={48} className="text-gray-500" />
                </div>
              )}
              <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600">
                <Camera size={20} />
              </label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
            <label htmlFor="profile-picture" className="text-teal-400 cursor-pointer hover:text-teal-300">
              {(localProfileImageUrl || imagePreviewUrls?.profilePicture || data.profilePicture) ? "Change photo" : "Upload photo"}
            </label>
          </div>
        </div>

        {/* Email and WhatsApp (Optional) */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2">Email (Optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email || ''}
            onChange={handleInputChange}
            placeholder="Email address"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="whatsappNumber" className="block text-lg font-medium mb-2">WhatsApp Number (Optional)</label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={data.whatsappNumber || ''}
            onChange={handleInputChange}
            placeholder="WhatsApp number"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
          />
        </div>

        {/* Contact Number with OTP verification */}
        <div>
          <label htmlFor="phone" className="block text-lg font-medium mb-2">Contact Number</label>
          <div className="flex space-x-3">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={data.phone || ''}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="10-digit number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
              required
              disabled={otpVerified}
            />
            {!otpSent && !otpVerified && (
              <button 
                type="button" 
                onClick={generateOtp}
                disabled={!data.phone || data.phone.length !== 10 || otpLoading}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${!data.phone || data.phone.length !== 10 || otpLoading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {otpLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Sending...
                  </span>
                ) : (
                  'Verify'
                )}
              </button>
            )}
            {otpVerified && (
              <div className="flex items-center text-green-500">
                <CheckCircle size={20} className="mr-2" />
                Verified
              </div>
            )}
            {otpSent && !otpVerified && (
              <button
                type="button"
                onClick={generateOtp}
                disabled={otpLoading}
                className="px-4 py-2 rounded-md font-medium bg-yellow-600 hover:bg-yellow-700 text-white flex items-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Resend
              </button>
            )}
          </div>
          
          {/* OTP verification section */}
          {otpSent && !otpVerified && (
            <div className="mt-4 p-4 border border-gray-700 rounded-md bg-gray-800">
              <p className="text-sm mb-3">Enter the verification code sent to your phone</p>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={!otpCode || otpCode.length !== 6 || otpLoading}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${!otpCode || otpCode.length !== 6 || otpLoading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {otpLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Verifying...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={generateOtp}
                  disabled={otpLoading}
                  className="text-blue-400 text-sm flex items-center hover:text-blue-300"
                >
                  <RefreshCw size={14} className="mr-1" />
                  Resend code
                </button>
                {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 space-y-4">
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md transition-colors"
            disabled={loading || !otpVerified}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </span>
            ) : (
              "Continue"
            )}
          </button>
          
          {/* Mobile version of already registered link */}
          <div className="text-center block md:hidden mt-6">
            <Link 
              to="/worker-login" 
              className="font-medium transition-colors hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
              style={{ color: '#00E0B8' }}
            >
              Already registered? Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}