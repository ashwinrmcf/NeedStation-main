import styles from './WorkerRegistration.module.css'; // Import the CSS module

const Step5Emergency = ({ data, updateForm, next, back }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Emergency Contact</h2>

      <div className={styles.formSection}>
        <label className={styles.label}>Emergency Contact Number</label>
        <input
          name="emergencyContact"
          value={data.emergencyContact}
          onChange={handleChange}
          placeholder="Enter emergency contact"
          className={styles.input}
        />
      </div>

      <button onClick={back} className={styles.button}>Back</button>
      <button onClick={next} className={styles.button}>Next</button>
    </main>
  );
};

export default Step5Emergency;
