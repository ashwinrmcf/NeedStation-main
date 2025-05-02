import styles from './WorkerRegistration.module.css'; // Import the CSS module

const Step4Category = ({ data, updateForm, next, back }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Work Category</h2>

      <div className={styles.formSection}>
        <label className={styles.label}>Category</label>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className={`${styles.input} ${styles.option}`}
        >
          <option value="">Select category</option>
          <option value="Cooking">Cooking</option>
          <option value="Babysitting">Babysitting</option>
          <option value="Daycare">Daycare</option>
          <option value="Elder Care">Elder Care</option>
        </select>
      </div>

      <div className={styles.formSection}>
        <label className={styles.label}>Experience (in years)</label>
        <input
          name="experience"
          type="number"
          value={data.experience}
          onChange={handleChange}
          placeholder="e.g., 2"
          className={styles.input}
        />
      </div>

      <button onClick={back} className={styles.button}>Back</button>
      <button onClick={next} className={styles.button}>Next</button>
    </main>
  );
};

export default Step4Category;
