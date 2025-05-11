import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import styles from "./Header.module.css";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown.jsx";
import { useAuth } from "../../store/AuthContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  console.log("AuthContext user:", user);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation(); 
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);


  return (
    <>
      <div
        style={{
          minHeight: isDropdownOpen ? "40vh" : "auto",
        }}
      >
        <header className={styles.header}>
          <Link to="/">
            <div className={styles.logo} data-no-translate="true">
              <span className={styles.needText} data-no-translate="true">Need</span><span className={styles.stationText} data-no-translate="true">Station</span>
            </div>
          </Link>
          <nav className={styles.navLinks}>
            <NavLink to="/" className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink>
            <button 
              className={`${styles.dropdownToggle} ${location.pathname.includes('/basic-needs') || 
                location.pathname.includes('/maid-services') || 
                location.pathname.includes('/elder-care') ? styles.active : ''}`} 
              onClick={toggleDropdown}
            >
              Services
            </button>
            <NavLink to="/language-settings" className={({isActive}) => isActive ? styles.active : undefined}>Languages</NavLink>
            <NavLink to="/about-us" className={({isActive}) => isActive ? styles.active : undefined}>About Us</NavLink>
          </nav>
          <div className={styles.authButtons}>
            {user ? (
              <>
                <span className={styles.greeting}>Hello, {user.username}</span>
                <button className={styles.logout} onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={styles.login}>Log in</button>
                </Link>
                <Link to="/signup">
                  <button className={styles.signup}>Sign up</button>
                </Link>
                <Link to="/helper-registration">
                  <button className={styles.becomeTasker}>
                    Become a Tasker
                  </button>
                </Link>
              </>
            )}
          </div>
        </header>
        {isDropdownOpen && <HeaderDropdown />}
      </div>
    </>
  );
};

export default Header;
