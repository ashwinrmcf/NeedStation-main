import { useState } from 'react';
import { Upload, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SkillVerificationPage({prev,next}) {
  const [certificates, setCertificates] = useState([]);
  const [idProof, setIdProof] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState(null);
  
  const handleCertificateUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setCertificates([...certificates, ...newFiles]);
    }
  };
  
  const handleIdProofUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIdProof(e.target.files[0]);
    }
  };
  
  const handleSelfieUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelfieWithId(e.target.files[0]);
    }
  };
  
  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1);
    setCertificates(updatedCertificates);
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
            {/* Certificates Upload */}
            <div className="space-y-2">
              <label className="block font-medium">Upload Certificates <span className="text-gray-400 text-sm">(optional but gives credibility)</span></label>
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
                  <ul className="space-y-1">
                    {certificates.map((file, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                        <span className="truncate">{file.name}</span>
                        <button 
                          onClick={() => removeCertificate(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* ID Proof Upload */}
            <div className="space-y-2">
              <label className="block font-medium">ID Proof Upload <span className="text-gray-400 text-sm">(Aadhaar/PAN/Voter ID – for verification)</span></label>
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
              <label className="block font-medium">Selfie with ID <span className="text-gray-400 text-sm">(for additional verification)</span></label>
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
          <button onClick={next}  className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-md flex items-center">
            Next
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}