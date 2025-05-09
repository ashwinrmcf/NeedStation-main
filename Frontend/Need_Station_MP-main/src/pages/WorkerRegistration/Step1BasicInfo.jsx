import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Calendar, Camera, Loader2, User,
} from 'lucide-react';

export default function Step1BasicInfo({ data, updateForm, next, workerId, updateWorkerId }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend API URL - update this to your actual backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating field:", name, "to value:", value); // Debug log
    updateForm({
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      const localUrl = URL.createObjectURL(file);
      setProfilePictureURL(localUrl);
      
      // Store local image URL in localStorage for temporary access
      localStorage.setItem('tempProfileImageUrl', localUrl);
      
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
    
    // Profile picture is now optional

  // --- FULL NAME INPUT FIELD (ADDED) ---
  // Place this in your return JSX form fields section, near the top for visibility.
  // Example:
  // <input
  //   type="text"
  //   name="fullName"
  //   value={data.fullName || ""}
  //   onChange={handleInputChange}
  //   placeholder="Full Name"
  //   required
  // />
  // ----------------------
    
    // Update the form with profile picture before sending to server
    updateForm({ profilePicture });
    
    // Create FormData object
    const formData = new FormData();
    
    // Add profile picture
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    
    // Create DTO for worker registration with explicit non-null values
    const workerData = {
      fullName: fullName || "",      // Ensure non-null values
      gender: gender || "",
      dob: dob || "2000-01-01",      // Default date if empty
      phone: phone || "",
      email: email || "",
      whatsappNumber: whatsappNumber || "",
      otpVerified: false            // Set to false since we're not verifying OTP
    };
    
    console.log("Sending worker data:", workerData);
    
    // Append worker data as a plain JSON string
    formData.append("data", JSON.stringify(workerData));
    
    setLoading(true);
    
    try {
      // Create endpoint URL
      let url = `${API_URL}/worker/register/step1`;
      
      // Add workerId parameter if it exists
      if (workerId) {
        url += `?workerId=${workerId}`;
      }
      
      setLoading(true);
      console.log("Sending request to URL:", url);
      // Don't set Content-Type header manually, axios will set the correct boundary
      const response = await axios.post(url, formData, {
        // Let axios set the Content-Type with the proper boundary
        headers: {}
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

        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md inline-flex items-center mt-6 mb-10">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Few more steps to see your earnings!
        </div>

        <h2 className="text-3xl font-bold mb-0">Tell us about yourself!</h2>
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
              {profilePictureURL ? (
                <img
                  src={profilePictureURL}
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
              {profilePictureURL ? "Change photo" : "Upload photo"}
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

        {/* Contact Number (simplified, no OTP verification) */}
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
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-md font-semibold tracking-wide"
            disabled={loading}
          >
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
}