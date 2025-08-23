import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ emailOrContact: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have redirection info from service pages
  const redirectPath = location.state?.redirectAfterLogin || "/";
  const serviceData = location.state?.serviceData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        login(data.username);
        localStorage.setItem("username",data.username);
        
        // If we came from a service page, redirect to user-details with the service data
        if (redirectPath === '/user-details' && serviceData) {
          navigate(redirectPath, { state: serviceData });
        } else {
          navigate("/");
        }
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: credentialResponse.credential
        }),
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setMessage("Google login successful!");
        login(data.user.name);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("authToken", data.token);
        
        // If we came from a service page, redirect to user-details with the service data
        if (redirectPath === '/user-details' && serviceData) {
          navigate(redirectPath, { state: serviceData });
        } else {
          navigate("/");
        }
      } else {
        setMessage(data.message || "Google login failed.");
      }
    } catch (error) {
      setMessage("Google login error. Please try again.");
    }
  };

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
          callback: handleGoogleLogin,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className={styles["header-container"]}>
        <Link to="/">
          <div className={styles["logo"]}>
            Need<span>Station</span>
          </div>
        </Link>
        <Link to="/signup">
          <div className={styles["account-text"]}>
            Don't have an account?{" "}
            <span className={styles["login-link"]}>Sign Up</span>
          </div>
        </Link>
      </div>

      <div className={`${styles["form-container"]} signup-form-spacing`}>
        <h2>Login</h2>
        <input
          type="text"
          name="emailOrContact"
          className={styles["input-box"]}
          placeholder="Email or Contact Number"
          value={formData.emailOrContact}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={styles["input-box"]}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={styles["continue-btn"]} onClick={handleLogin}>
          Continue
        </button>
        {message && <p>{message}</p>}
        <div className={styles["separator"]}>
          <span className={styles["line"]}>
            <hr />
          </span>
          or
          <span className={styles["line"]}>
            <hr />
          </span>
        </div>
        <button 
          className={`${styles["social-btn"]} ${styles["google-btn"]}`}
          onClick={() => {
            if (window.google) {
              window.google.accounts.id.prompt();
            }
          }}
        >
          Continue with Google
        </button>
        {/* <button className={`${styles["social-btn"]} ${styles["facebook-btn"]}`}>
          Continue with Facebook
        </button> */}
      </div>
    </>
  );
};

export default Login;
