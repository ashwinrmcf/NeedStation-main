import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; 
import styles from "./Header.module.css";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown.jsx";
import TaskerDropdown from "../TaskerDropdown/TaskerDropdown.jsx";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../store/AuthContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  console.log("AuthContext user:", user);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTaskerDropdownOpen, setTaskerDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const taskerButtonRef = useRef(null);
  
  // Check current language on mount and when localStorage changes
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem('needstation-language') || 'en';
      setCurrentLanguage(lang);
    };
    
    // Check on mount
    checkLanguage();
    
    // Listen for storage changes (in case language is changed)
    window.addEventListener('storage', checkLanguage);
    
    return () => {
      window.removeEventListener('storage', checkLanguage);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation(); 
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);


  return (
    <>
      <div className={styles.headerContainer}>
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
                <div 
                  className={styles.taskerContainer}
                  onMouseEnter={() => setTaskerDropdownOpen(true)}
                  onMouseLeave={() => setTaskerDropdownOpen(false)}
                  onClick={() => currentLanguage === 'hi' && setTaskerDropdownOpen(!isTaskerDropdownOpen)}
                  ref={taskerButtonRef}
                  data-language={currentLanguage}
                >
                  <button className={styles.becomeTasker}>
                    Become a Tasker
                  </button>
                  <AnimatePresence>
                    {isTaskerDropdownOpen && <TaskerDropdown isVisible={true} />}
                  </AnimatePresence>
                </div>
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
