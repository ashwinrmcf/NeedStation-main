import styles from './WorkerRegistration.module.css'; 
const Step2FamilyAddress = ({ data, updateForm, next, back }) => {
    const handleChange = (e) => {
      updateForm({ [e.target.name]: e.target.value });
    };
  
    return (
      <main>
        <h2>Family & Address Info</h2>
  
        <div className="form-section">
          <label>Family Phone</label>
          <input
            name="familyPhone"
            value={data.familyPhone}
            onChange={handleChange}
            placeholder="Enter family contact number"
          />
        </div>
  
        <div className="form-section">
          <label>Permanent Address</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Enter permanent address"
          />
        </div>
  
        <div className="form-section">
          <label>Current Address</label>
          <textarea
            name="currentAddress"
            value={data.currentAddress}
            onChange={handleChange}
            placeholder="Enter current address"
          />
        </div>
  
        <button onClick={back} className="button">Back</button>
        <button onClick={next} className="button">Next</button>
      </main>
    );
  };
  
  export default Step2FamilyAddress;
  