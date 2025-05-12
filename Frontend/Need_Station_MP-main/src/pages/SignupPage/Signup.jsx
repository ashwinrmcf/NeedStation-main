import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginPage/Login.module.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({  password: '', username: '', email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigate('/login');
      } else {
        setMessage(data.message || 'Signup failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className={styles['header-container']}>
        <Link to="/">
          <div className={styles['logo']}>Need<span>Station</span></div>
        </Link>
        <Link to="/login">
          <div className={styles['account-text']}>
            Already have an account? <span className={styles['login-link']}>Log in</span>
          </div>
        </Link>
      </div>

      <div className={`${styles['form-container']} signup-form-spacing`}>
        <h2>Sign up</h2>
        <input
          type="text"
          name="username"
          className={styles['input-box']}
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className={styles['input-box']}
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={styles['input-box']}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={styles['continue-btn']} onClick={handleSignup}>Continue</button>
        {message && <p>{message}</p>}

        <div className={styles['separator']}>
          <span className={styles['line']}><hr /></span>
          or
          <span className={styles['line']}><hr /></span>
        </div>
        <button className={`${styles['social-btn']} ${styles['google-btn']}`}>Continue with Google</button>
        {/* <button className={`${styles['social-btn']} ${styles['facebook-btn']}`}>Continue with Facebook</button> */}
        <div className={styles['terms']}>
          By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
};

export default Signup;
