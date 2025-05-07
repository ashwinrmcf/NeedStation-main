
import { useState } from 'react';
import { MapPin, CheckCircle, HelpCircle } from 'lucide-react';

export default function LocationDetailsForm({updateForm, next, prev }) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pincode: '',
    serviceAreas: [],
    openToTravel: false
  });

  const [availableAreas] = useState([
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAreaSelect = (area) => {
    setFormData(prev => {
      if (prev.serviceAreas.includes(area)) {
        return {
          ...prev,
          serviceAreas: prev.serviceAreas.filter(a => a !== area)
        };
      } else {
        return {
          ...prev,
          serviceAreas: [...prev.serviceAreas, area]
        };
      }
    });
  };

  const handleSubmit = () => {
   // e.preventDefault();
    updateForm({ [e.target.name]: e.target.value });
     
     // next();
    // Here you would handle form submission logic
  };

  return (
    <div className="min-h-screen  text-white">
  
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Register as a <span className="text-teal-400">worker</span>
        </h2>

        {/* Progress Indicator */}
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md my-6 flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          <p className="text-sm md:text-base">Few more steps to see your earnings!</p>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">
          <span className="text-teal-400">Location</span> Details
        </h3>

        <div className="space-y-6">
          {/* Current Address */}
          <div>
            <label htmlFor="address" className="block mb-2">Current Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block mb-2">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block mb-2">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <label className="block mb-2">Areas/Cities you can serve</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {availableAreas.map((area) => (
                <div 
                  key={area}
                  onClick={() => handleAreaSelect(area)}
                  className={`
                    p-2 border rounded-md cursor-pointer flex items-center justify-center text-center
                    ${formData.serviceAreas.includes(area) 
                      ? 'bg-teal-400 text-gray-900 border-teal-400' 
                      : 'bg-gray-800 border-gray-700 hover:border-teal-400'
                    }
                  `}
                >
                  {area}
                  {formData.serviceAreas.includes(area) && (
                    <CheckCircle className="ml-1 h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Select all areas where you can provide services</p>
          </div>

          {/* Open to Travel */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="openToTravel"
                checked={formData.openToTravel}
                onChange={handleChange}
                className="w-5 h-5 accent-teal-400"
              />
              <span>Are you open to travel?</span>
            </label>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button onClick={prev}
              type="button"
              className="bg-transparent border border-gray-600 text-white rounded-md px-6 py-3 hover:bg-gray-800"
            >
              Back
            </button>
            <button onClick={next}
              type="button"
              className="bg-teal-400 text-gray-900 rounded-md px-6 py-3 hover:bg-teal-500"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}