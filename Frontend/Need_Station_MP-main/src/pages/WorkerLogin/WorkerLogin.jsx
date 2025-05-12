import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../LoginPage/Login.module.css";
import axios from "axios";

const WorkerLogin = () => {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleLogin = async () => {
    // Validation
    if (!formData.email || !formData.phone) {
      setMessage("Please enter email and mobile number");
      return;
    }
    
    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      
      // Simple hard-coded test data for debugging
      const testEmail = "test@example.com";
      const testPhone = "1234567890";
      
      console.log("Sending login request with:", { 
        identifier: formData.email || testEmail, 
        phone: formData.phone || testPhone 
      });
      
      // Connect to the new worker authentication endpoint with explicit CORS headers
      const response = await axios.post(
        "http://localhost:8080/api/worker/auth/login", 
        {
          identifier: formData.email || testEmail,
          phone: formData.phone || testPhone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log("Login response:", response.data);
      
      // If we get here, login was successful
      const { worker } = response.data;
      
      // Store worker info in localStorage
      localStorage.setItem("workerId", worker.id);
      localStorage.setItem("workerName", worker.fullName);
      localStorage.setItem("workerPhone", worker.phone);
      localStorage.setItem("workerEmail", worker.email);
      localStorage.setItem("workerProfileImage", worker.profileImageUrl || "");
      localStorage.setItem("workerLoggedIn", "true");
      
      // Show success message briefly before redirecting
      setMessage("Login successful! Redirecting...");
      
      // Redirect to worker dashboard
      setTimeout(() => {
        navigate("/helper/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response && error.response.data) {
        // Show server error message if available
        setMessage(`Login failed: ${error.response.data.message || "Check your credentials."}`);
        console.log("Error details:", error.response.data);
      } else {
        setMessage(`An error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles["header-container"]}>
        <Link to="/">
          <div className={styles["logo"]}>
            Need<span>Station</span>
          </div>
        </Link>
        <Link to="/worker-registration">
          <div className={styles["account-text"]}>
            Not registered yet?{" "}
            <span className={styles["login-link"]}>Register as Helper</span>
          </div>
        </Link>
      </div>

      <div className={`${styles["form-container"]} signup-form-spacing`}>
        <h2>Helper Login</h2>
        <input
          type="email"
          name="email"
          className={styles["input-box"]}
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          className={styles["input-box"]}
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          maxLength={10}
        />
        <button 
          className={styles["continue-btn"]} 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
        
        
        {message && <p className={styles["message"]}>{message}</p>}
        <div className={styles["separator"]}>
          <span className={styles["line"]}>
            <hr />
          </span>
          or
          <span className={styles["line"]}>
            <hr />
          </span>
        </div>
        <button className={`${styles["social-btn"]} ${styles["google-btn"]}`}>
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default WorkerLogin;
