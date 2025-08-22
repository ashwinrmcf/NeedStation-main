import { useState } from 'react';
import { Upload, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

export default function SkillVerificationPage({ data, updateForm, prev, next, workerId }) {
  if (!workerId) {
    console.error("Worker ID is required for this step");
  }
  // Initialize state with data from parent or defaults
  const [formData, setFormData] = useState({
    aadharNumber: data.aadharNumber || '',
    policeVerificationStatus: data.policeVerificationStatus || ''
  });
  const [certificates, setCertificates] = useState([]);
  const [idProof, setIdProof] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCertificateUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
          alert(`File ${file.name} is not supported. Please upload PNG, JPG, or PDF files only.`);
          return false;
        }
        return true;
      });
      setCertificates([...certificates, ...newFiles]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update parent form data
    updateForm({
      [name]: value
    });
  };

  const handleIdProofUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload PNG, JPG, or PDF files only for ID proof.');
        return;
      }
      setIdProof(file);
    }
  };

  const handleSelfieUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload PNG, JPG, or PDF files only for selfie with ID.');
        return;
      }
      setSelfieWithId(file);
    }
  };

  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // All fields are now optional, no validation needed

    try {
      // API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      
      // Add files one by one with separate requests to avoid conflicts
      let uploadPromises = [];
      
      // Add ID proof if available
      if (idProof) {
        const idProofForm = new FormData();
        idProofForm.append("file", idProof);
        uploadPromises.push(
          axios.post(`${API_URL}/worker/upload/document?workerId=${workerId}&fileType=ID_PROOF`, idProofForm, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        );
      }
      
      // Add selfie with ID if available
      if (selfieWithId) {
        const selfieForm = new FormData();
        selfieForm.append("file", selfieWithId);
        uploadPromises.push(
          axios.post(`${API_URL}/worker/upload/document?workerId=${workerId}&fileType=SELFIE_WITH_ID`, selfieForm, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        );
      }
      
      // Add certificates if available
      certificates.forEach((cert, index) => {
        const certForm = new FormData();
        certForm.append("file", cert);
        uploadPromises.push(
          axios.post(`${API_URL}/worker/upload/document?workerId=${workerId}&fileType=CERTIFICATE`, certForm, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        );
      });
      
      // Upload all files
      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }
      
      // Skip backend submission for now due to endpoint issues
      console.log("Skipping Step 4 backend submission - proceeding to next step");
      
      // Update parent form with current data
      updateForm({
        aadharNumber: formData.aadharNumber,
        policeVerificationStatus: formData.policeVerificationStatus
      });
      
      // Proceed to next step
      next();
    } catch (error) {
      console.error("Error saving verification details:", error);
      alert(error.response?.data?.error || "Failed to save your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-cyan-400">Register as a worker</h1>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md mb-8 flex items-center">
          <AlertCircle className="mr-2 flex-shrink-0" size={20} />
          <p>Few more steps to see your earnings!</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="text-cyan-400">Skill Verification</span> Details
          </h2>

          <div className="space-y-6">
            {/* Aadhaar Number */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Aadhaar Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="Enter your 12-digit Aadhaar number"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Police Verification Status */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Police Verification Status <span className="text-red-500">*</span></label>
              <select
                name="policeVerificationStatus"
                value={formData.policeVerificationStatus}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              >
                <option value="">Select status</option>
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="In Progress">In Progress</option>
                <option value="Verified">Verified</option>
              </select>
            </div>

            {/* Certificates Upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Skills/Certificates (Optional)</label>
              <div className="border-2 border-dashed border-teal-600 rounded-md p-4 bg-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="mb-2 text-cyan-400" size={24} />
                  <p className="text-center text-gray-300 mb-2">Drag and drop files or click to browse</p>
                  <input
                    type="file"
                    className="hidden"
                    id="certificateUpload"
                    multiple
                    onChange={handleCertificateUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <button
                    onClick={() => document.getElementById('certificateUpload').click()}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {certificates.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium mb-1">Uploaded Certificates:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificates.map((file, index) => (
                      <div key={index} className="bg-gray-800 rounded-md p-3 flex items-center justify-between">
                        <span className="truncate">{file.name}</span>
                        <button
                          onClick={() => removeCertificate(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ID Proof Upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">ID Proof Upload <span className="text-gray-400 text-sm">(Aadhaar/PAN/Voter ID – for verification)</span></label>
              <div className="border-2 border-dashed border-teal-600 rounded-md p-4 bg-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="mb-2 text-cyan-400" size={24} />
                  <p className="text-center text-gray-300 mb-2">Upload a clear scan or photo of your ID</p>
                  <input
                    type="file"
                    className="hidden"
                    id="idProofUpload"
                    onChange={handleIdProofUpload}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <button
                    onClick={() => document.getElementById('idProofUpload').click()}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {idProof && (
                <div className="mt-2 bg-gray-800 p-2 rounded flex justify-between items-center">
                  <span className="truncate">{idProof.name}</span>
                  <button
                    onClick={() => setIdProof(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Selfie with ID */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Selfie with ID <span className="text-gray-400 text-sm">(for additional verification)</span></label>
              <div className="border-2 border-dashed border-teal-600 rounded-md p-4 bg-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="mb-2 text-cyan-400" size={24} />
                  <p className="text-center text-gray-300 mb-2">Upload a clear selfie holding your ID</p>
                  <input
                    type="file"
                    className="hidden"
                    id="selfieUpload"
                    onChange={handleSelfieUpload}
                    accept=".jpg,.jpeg,.png"
                  />
                  <button
                    onClick={() => document.getElementById('selfieUpload').click()}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {selfieWithId && (
                <div className="mt-2 bg-gray-800 p-2 rounded flex justify-between items-center">
                  <span className="truncate">{selfieWithId.name}</span>
                  <button
                    onClick={() => setSelfieWithId(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button onClick={prev} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center">
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          <button onClick={handleSubmit}
            type="button"
            className="bg-teal-500 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-teal-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Continue</span>
                <ChevronRight className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}