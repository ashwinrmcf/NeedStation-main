
//FINAL CODE    
import { useState } from 'react';
import { Calendar, Camera, CheckCircle, Eye, EyeOff, Loader2, Mail, Phone, Send, User } from 'lucide-react';

export default function Step1BasicInfo({ data, updateForm, next }) {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    otpSent: false,
    otpVerified: false,
    otp: '',
    email: '',
    whatsappNumber: '',
  });
  
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setProfilePictureURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSendOTP = () => {
    if (!formData.contactNumber || formData.contactNumber.length !== 10) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }
    
    setOtpLoading(true);
    
    // Simulating OTP send
    setTimeout(() => {
      setOtpLoading(false);
      setShowOtpInput(true);
      setFormData({
        ...formData,
        otpSent: true
      });
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    
    setVerifyLoading(true);
    
    // Simulating OTP verification
    setTimeout(() => {
      setVerifyLoading(false);
      setFormData({
        ...formData,
        otpVerified: true
      });
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (!formData.otpVerified) {
    //   alert("Please verify your contact number with OTP");
    //   return;
    // }
    
    // Form validation
    // if (!formData.fullName || !formData.gender || !formData.dateOfBirth || !profilePicture) {
    //   alert("Please fill all required fields");
    //   return;
    // }
    
    // Process form submission
    console.log("Form Data:", formData);
    console.log("Profile Picture:", profilePicture);
    
    // Here you would typically send the data to your backend
    //alert("Form submitted successfully!");

    updateForm({ ...formData, profilePicture });
  next();

  };

  return (
    <div className="min-h-screen md:w-full lg:w-full text-white flex flex-col items-center p-4">
      {/* Header/Nav */}
      

      {/* Main Content */}
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

      {/* Form */}
      <div className="w-full max-w-lg mx-auto">
        <div className="space-y-4 ">
          {/* Name */}
          <div>
            <label htmlFor="fullName" className="block text-lg font-medium text-white mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
             // onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-yellow-500 mt-1">
              Special Characters like !@#$%^&*()_+=~. are not allowed
            </p>
          </div>
          
          {/* Gender */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Gender
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['Male', 'Female', 'Other'].map((option) => (
                <label 
                  key={option} 
                  className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition ${
                    formData.gender === option 
                    ? 'bg-teal-500 border-teal-600 text-white' 
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                   // onChange={handleInputChange}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          
          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-lg font-medium text-white mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
             // onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>
          
          {/* Profile Picture */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Profile Picture
            </label>
            <div className="flex flex-col items-center justify-center">
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
                <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition">
                  <Camera size={20} />
                </label>
              </div>
              <label htmlFor="profile-picture" className="text-teal-400 cursor-pointer hover:text-teal-300">
                {profilePictureURL ? "Change photo" : "Upload photo"}
              </label>
              <input 
                type="file" 
                id="profile-picture" 
                accept="image/*" 
                className="hidden" 
               // onChange={handleProfilePictureChange}
              />
            </div>
          </div>
          
          {/* Contact Number with OTP */}
          <div>
            <label htmlFor="contactNumber" className="block text-lg font-medium text-white mb-2">
              Contact Number
            </label>
            <div className="flex space-x-3">
              <div className="relative flex-grow">
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                 // onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  disabled={formData.otpVerified}
                  required
                />
                {formData.otpVerified && (
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                )}
              </div>
              {!formData.otpSent ? (
                <button
                  type="button"
                 // onClick={handleSendOTP}
                  disabled={otpLoading || !formData.contactNumber || formData.contactNumber.length !== 10 || formData.otpVerified}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:hover:bg-teal-500 transition whitespace-nowrap"
                >
                  {otpLoading ? (
                    <div className="flex items-center">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Sending
                    </div>
                  ) : "Send OTP"}
                </button>
              ) : formData.otpVerified ? (
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded-md cursor-default flex items-center justify-center"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Verified
                </button>
              ) : null}
            </div>
            
            {/* OTP Input */}
            {showOtpInput && !formData.otpVerified && (
              <div className="mt-3">
                <div className="flex space-x-3">
                  <div className="relative flex-grow">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="otp"
                      name="otp"
                      value={formData.otp}
                     // onChange={handleInputChange}
                      placeholder="Enter 6-digit OTP"
                      className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      //onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {passwordVisible ? (
                        <EyeOff size={20} className="text-gray-400" />
                      ) : (
                        <Eye size={20} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    //onClick={handleVerifyOTP}
                    disabled={verifyLoading || !formData.otp || formData.otp.length !== 6}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:hover:bg-teal-500 transition whitespace-nowrap"
                  >
                    {verifyLoading ? (
                      <div className="flex items-center">
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Verifying
                      </div>
                    ) : "Verify OTP"}
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">OTP sent to your mobile number</p>
              </div>
            )}
          </div>
          
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
              Email Address <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              //onChange={handleInputChange}
              placeholder="For notifications (optional)"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          {/* WhatsApp Number */}
          <div>
            <label htmlFor="whatsappNumber" className="block text-lg font-medium text-white mb-2">
              WhatsApp Number <span className="text-gray-400">(if different)</span>
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
            //  onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="If different from contact number"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white px-4 py-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium text-lg transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}