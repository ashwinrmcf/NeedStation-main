import styles from './WorkerRegistration.module.css'; 
const Step1BasicInfo = ({ data, updateForm, next }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <main>
      <h2>Register as a Worker</h2>

      <div className="form-section">
        <label htmlFor="fullName">Full Name</label>
        <input
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-section">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={handleChange}
        />
      </div>

      <div className="form-section">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="option"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>
      </div>

      <div className="form-section">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <button onClick={next} className="button">Next</button>
    </main>
  );
};

export default Step1BasicInfo;
