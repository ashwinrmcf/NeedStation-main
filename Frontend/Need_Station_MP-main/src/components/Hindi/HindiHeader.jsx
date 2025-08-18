import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../store/AuthContext.jsx";
import HindiTaskerDropdown from "./HindiTaskerDropdown.jsx";
import "../Header/Header.module.css"; // Reuse the same styling
import "./Hindi.css"; // Hindi-specific styling overrides

// Hindi version of the Header component with pre-translated content
const HindiHeader = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTaskerDropdownOpen, setTaskerDropdownOpen] = useState(false);
  const taskerButtonRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation();
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="headerContainer">
        <header className="header">
          <Link to="/hi">
            <div className="logo" data-no-translate="true">
              <span className="needText" data-no-translate="true">Need</span>
              <span className="stationText" data-no-translate="true">Station</span>
            </div>
          </Link>
          <nav className="navLinks">
            <NavLink to="/hi" className={({isActive}) => isActive ? "active" : undefined}>होम</NavLink>
            <button 
              className={`dropdownToggle ${location.pathname.includes('/hi/basic-needs') || 
                location.pathname.includes('/hi/maid-services') || 
                location.pathname.includes('/hi/elder-care') ? "active" : ''}`} 
              onClick={toggleDropdown}
            >
              सेवाएं
            </button>
            <NavLink to="/language-settings" className={({isActive}) => isActive ? "active" : undefined}>भाषाएँ</NavLink>
            <NavLink to="/hi/about-us" className={({isActive}) => isActive ? "active" : undefined}>हमारे बारे में</NavLink>
          </nav>
          <div className="authButtons">
            {user ? (
              <>
                <span className="greeting">नमस्ते, {user.username}</span>
                <button className="logout" onClick={logout}>
                  लॉगआउट
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="login">लॉग इन</button>
                </Link>
                <Link to="/signup">
                  <button className="signup">साइन अप</button>
                </Link>
                <div className="taskerContainer">
                  <button 
                    className="becomeTasker" 
                    onClick={() => setTaskerDropdownOpen(!isTaskerDropdownOpen)}
                  >
                    टास्कर बनें
                  </button>
                </div>
              </>
            )}
          </div>
        </header>
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '0',
            right: '0',
            zIndex: 999,
            backgroundColor: '#121212',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '30px 20px'
            }}>
              <div style={{ margin: '0 40px' }}>
                <h3 style={{ color: '#00ced1', marginBottom: '15px', fontSize: '16px', fontWeight: 600 }}>बुनियादी आवश्यकताएँ</h3>
                <Link to="/hi/electrician" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>इलेक्ट्रीशियन</Link>
                <Link to="/hi/plumber" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>प्लंबर</Link>
                <Link to="/hi/water-supply" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>पानी की आपूर्ति</Link>
              </div>
              <div style={{ margin: '0 40px' }}>
                <h3 style={{ color: '#00ced1', marginBottom: '15px', fontSize: '16px', fontWeight: 600 }}>मेड सेवाएँ</h3>
                <Link to="/hi/maid-services" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>घरेलू सहायक</Link>
                <Link to="/hi/cooking" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>रसोइया</Link>
                <Link to="/hi/cleaning" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>सफाई सेवाएँ</Link>
              </div>
              <div style={{ margin: '0 40px' }}>
                <h3 style={{ color: '#00ced1', marginBottom: '15px', fontSize: '16px', fontWeight: 600 }}>बुजुर्गों की देखभाल</h3>
                <Link to="/hi/caretaker" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>देखभालकर्ता</Link>
                <Link to="/hi/nurse" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>नर्स</Link>
                <Link to="/hi/babysitter" style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', marginBottom: '10px' }}>बेबीसिटर</Link>
              </div>
            </div>
          </div>
        )}
        {isTaskerDropdownOpen && (
          <HindiTaskerDropdown isVisible={true} />
        )}
      </div>
    </>
  );
};

export default HindiHeader;
