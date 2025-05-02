import styles from './WorkerRegistration.module.css'; // Import the CSS module

const Step6Review = ({ data, submitForm, back }) => {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Review Your Info</h2>
      <div className={styles.formSection}>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#FFFFFF' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <button onClick={back} className={styles.button}>Back</button>
      <button onClick={submitForm} className={styles.button}>Submit</button>
    </main>
  );
};

export default Step6Review;
