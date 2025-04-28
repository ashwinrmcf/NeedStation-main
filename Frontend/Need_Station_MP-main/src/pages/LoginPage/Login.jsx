import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
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
        <Link to="/signup">
          <div className={styles["account-text"]}>
            Don't have an account?{" "}
            <span className={styles["login-link"]}>Sign Up</span>
          </div>
        </Link>
      </div>

      <div className={styles["form-container"]}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          className={styles["input-box"]}
          placeholder="Username"
          value={formData.username}
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
        <button className={`${styles["social-btn"]} ${styles["google-btn"]}`}>
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
