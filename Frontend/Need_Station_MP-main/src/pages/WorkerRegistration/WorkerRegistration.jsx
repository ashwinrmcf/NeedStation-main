// src/pages/worker/WorkerRegistration.jsx
import { useState } from 'react';
import Step1 from './Step1BasicInfo.jsx';
import Step2 from './Step2ContactInfo.jsx';
import Step3 from './Step3Address.jsx';
import Step4 from './Step4WorkInfo.jsx';
import Step5 from './Step5PaymentInfo.jsx';
import Step6 from './Step6Review.jsx';

const WorkerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "", dob: "", gender: "", phone: "", familyPhone: "",
    address: "", currentAddress: "", aadhaar: "", verification: "",
    category: "", experience: "", emergencyContact: "",
    bankAccount: "", ifsc: "", upi: ""
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const updateForm = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const steps = [
    <Step1 data={formData} updateForm={updateForm} next={next} />,
    <Step2 data={formData} updateForm={updateForm} next={next} prev={prev} />,
    <Step3 data={formData} updateForm={updateForm} next={next} prev={prev} />,
    <Step4 data={formData} updateForm={updateForm} next={next} prev={prev} />,
    <Step5 data={formData} updateForm={updateForm} next={next} prev={prev} />,
    <Step6 data={formData} prev={prev} />
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {steps[step - 1]}
    </div>
  );
};

export default WorkerRegistration;

