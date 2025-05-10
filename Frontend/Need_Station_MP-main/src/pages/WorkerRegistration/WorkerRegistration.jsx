// src/pages/worker/WorkerRegistration.jsx
import { useState, useEffect } from 'react';
import Step1BasicInfo from './Step1BasicInfo';
import Step2ContactInfo from './Step2ContactInfo';
import Step3Address from './Step3Address';
import Step4WorkInfo from './Step4WorkInfo';
import Step5PaymentInfo from './Step5PaymentInfo';
import Step6Review from './Step6Review';
import axios from 'axios';

const WorkerRegistration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workerId, setWorkerId] = useState(null);

  // Check for existing workerId in localStorage on component mount
  useEffect(() => {
    const savedWorkerId = localStorage.getItem('workerId');
    if (savedWorkerId) {
      setWorkerId(Number(savedWorkerId));

      // Fetch worker data if workerId exists
      fetchWorkerData(savedWorkerId);
    }
  }, []);

  // State to store the local image preview URL
  const [localProfileImageUrl, setLocalProfileImageUrl] = useState(null);

  const [formData, setFormData] = useState({
    // Basic info
    fullName: "", 
    dob: "", 
    gender: "", 
    phone: "", 
    email: "",
    whatsappNumber: "",
    profilePicture: null,
    otpId: "",
    otpSent: false,
    otpVerified: false,

    // Additional fields for other steps
    familyPhone: "",
    address: "", 
    currentAddress: "", 
    aadhaar: "", 
    verification: "",
    category: "", 
    experience: "", 
    emergencyContact: "",
    bankAccount: "", 
    ifsc: "", 
    upi: ""
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const updateForm = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Function to fetch worker data from backend
  const fetchWorkerData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/worker/details/${id}`);
      if (response.data) {
        // Update form data with fetched worker data
        const worker = response.data;

        // Map backend data to form data structure
        const mappedData = {
          // Basic info
          fullName: worker.fullName || "",
          dob: worker.dob || "",
          gender: worker.gender || "",
          phone: worker.phone || "",
          email: worker.email || "",
          whatsappNumber: worker.whatsappNumber || "",

          // Contact info
          permanentAddress: worker.permanentAddress || "",
          currentAddress: worker.currentAddress || "",
          city: worker.city || "",
          pincode: worker.pincode || "",
          serviceAreas: worker.serviceAreas || "",
          openToTravel: worker.openToTravel || false,

          // Work info from JSON strings
          services: worker.services ? JSON.parse(worker.services) : {},
          experience: worker.experience || "",
          workType: worker.workType || "",
          availability: worker.availability ? JSON.parse(worker.availability) : {},
          languages: worker.languages ? JSON.parse(worker.languages) : {},

          // Verification
          aadharNumber: worker.aadharNumber || "",
          policeVerificationStatus: worker.policeVerificationStatus || "",
          idProofUrl: worker.idProofUrl || "",
          selfieWithIdUrl: worker.selfieWithIdUrl || "",
          certificateUrls: worker.certificateUrls ? JSON.parse(worker.certificateUrls) : {},

          // Payment
          paymentMode: worker.paymentMode || "",
          upiId: worker.upiId || "",
          bankName: worker.bankName || "",
          accountNumber: worker.accountNumber || "",
          ifscCode: worker.ifscCode || "",
          panCard: worker.panCard || "",

          // Emergency
          emergencyContactName: worker.emergencyContactName || "",
          emergencyContactNumber: worker.emergencyContactNumber || ""
        };

        setFormData(mappedData);
      }
    } catch (err) {
      console.error("Error fetching worker data:", err);
      // Check if error is due to worker not found
      if (err.response && err.response.status === 404 || err.message.includes("not found")) {
        console.log("Worker ID not found in database. Starting fresh registration.");
        // Clear invalid worker ID from localStorage
        localStorage.removeItem('workerId');
        // Reset workerId state
        setWorkerId(null);
        // Show friendly message
        setError("Starting a new registration. Your previous session was not found.");
      } else {
        setError("Failed to load your registration data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update workerId when receiving it from a step
  const updateWorkerId = (id) => {
    setWorkerId(id);
    localStorage.setItem('workerId', id);
  };

  // Final submission handler
  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make API call to finalize registration
      const response = await axios.post(`http://localhost:8080/api/worker/register/submit?workerId=${workerId}`);

      // Handle successful registration
      if (response.data) {
        // Success message or redirect
        alert("Registration completed successfully! You will be notified once your registration is approved.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Component mapping with props
  const steps = [
    <Step1BasicInfo 
      data={formData} 
      updateForm={updateForm} 
      next={next} 
      workerId={workerId} 
      updateWorkerId={updateWorkerId} 
    />,
    <Step2ContactInfo 
      data={formData} 
      updateForm={updateForm} 
      next={next} 
      prev={prev} 
      workerId={workerId} 
    />,
    <Step3Address 
      data={formData} 
      updateForm={updateForm} 
      next={next} 
      prev={prev} 
      workerId={workerId} 
    />,
    <Step4WorkInfo 
      data={formData} 
      updateForm={updateForm} 
      next={next} 
      prev={prev} 
      workerId={workerId} 
    />,
    <Step5PaymentInfo 
      data={formData} 
      updateForm={updateForm} 
      next={next} 
      prev={prev} 
      workerId={workerId} 
    />,
    <Step6Review 
      data={formData} 
      prev={prev} 
      onSubmit={handleFinalSubmit} 
      loading={loading} 
      error={error} 
      workerId={workerId} 
    />
  ];

  // Display progress indicator with glowing effect
  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['Basic Info', 'Address', 'Work', 'Verification', 'Payment', 'Review'].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="relative">
                {/* Glow effect div positioned absolutely */}
                <div className={`absolute inset-0 rounded-full blur-sm
                  ${step > idx + 1 ? 'bg-green-500/60' : 
                    step === idx + 1 ? 'bg-teal-500/60' : 'bg-transparent'}
                  transition-all duration-300`}></div>
                  
                {/* Main circle indicator */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center relative
                  ${step > idx + 1 ? 'bg-green-500 ring-2 ring-green-400' : 
                    step === idx + 1 ? 'bg-teal-500 ring-2 ring-teal-400' : 'bg-gray-700'}
                  transition-all duration-300`}>
                  {step > idx + 1 ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-white text-sm">{idx + 1}</span>
                  )}
                </div>
              </div>
              <span className={`text-xs mt-2 ${step === idx + 1 ? 'text-teal-500 font-semibold' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 h-1 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-teal-500 h-1 rounded-full shadow-lg shadow-teal-500/70" 
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Show progress bar for all steps except final success page */}
        {step <= 6 && renderProgressBar()}
        
        {/* Current step component */}
        {steps[step - 1]}
      </div>
    </div>
  );
};

export default WorkerRegistration;