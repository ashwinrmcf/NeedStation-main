import { useState } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaymentInformationPage({prev, next}) {
  const [paymentMode, setPaymentMode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [panCard, setPanCard] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showUpiDetails, setShowUpiDetails] = useState(false);

  const handlePaymentModeChange = (mode) => {
    setPaymentMode(mode);
    setShowBankDetails(mode === 'Bank Transfer');
    setShowUpiDetails(mode === 'UPI');
  };

  return (
    <div className="min-h-screen  text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-teal-400">Register as a worker</h1>
        
        {/* Alert Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
            <p className="text-yellow-700">Few more steps to see your earnings!</p>
          </div>
        </div>
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl">
            <span className="text-teal-400">Payment</span> Details
          </h2>
        </div>
        
        {/* Payment Form */}
        <div className="space-y-6">
          {/* Payment Mode */}
          <div>
            <label className="block text-lg mb-3">Preferred Payment Mode</label>
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-6 py-3 rounded border ${paymentMode === 'Bank Transfer' ? 'bg-teal-500 border-teal-400' : 'border-gray-600 bg-gray-800'}`}
                onClick={() => handlePaymentModeChange('Bank Transfer')}
              >
                Bank Transfer
              </button>
              <button 
                className={`px-6 py-3 rounded border ${paymentMode === 'UPI' ? 'bg-teal-500 border-teal-400' : 'border-gray-600 bg-gray-800'}`}
                onClick={() => handlePaymentModeChange('UPI')}
              >
                UPI
              </button>
              <button 
                className={`px-6 py-3 rounded border ${paymentMode === 'Cash' ? 'bg-teal-500 border-teal-400' : 'border-gray-600 bg-gray-800'}`}
                onClick={() => handlePaymentModeChange('Cash')}
              >
                Cash
              </button>
            </div>
          </div>
          
          {/* UPI Details (conditional) */}
          {showUpiDetails && (
            <div>
              <label className="block text-lg mb-3">UPI ID</label>
              <input 
                type="text" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID" 
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          )}
          
          {/* Bank Details (conditional) */}
          {showBankDetails && (
            <div className="space-y-4">
              <div>
                <label className="block text-lg mb-2">Bank Name</label>
                <input 
                  type="text" 
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter bank name" 
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-lg mb-2">Account Number</label>
                <input 
                  type="text" 
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  placeholder="Enter account number" 
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-lg mb-2">IFSC Code</label>
                <input 
                  type="text" 
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="Enter IFSC code" 
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          )}
          
          {/* PAN Card (always shown) */}
          <div>
            <label className="block text-lg mb-3">PAN Card Number</label>
            <input 
              type="text" 
              value={panCard}
              onChange={(e) => setPanCard(e.target.value)}
              placeholder="Enter PAN card number (for tax compliance)" 
              className="w-full p-4 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:border-teal-400"
            />
            <p className="text-sm text-gray-400 mt-1">Required for tax compliance</p>
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
    </div>
  );
}