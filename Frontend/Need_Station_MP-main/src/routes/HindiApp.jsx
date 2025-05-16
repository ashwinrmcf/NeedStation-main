import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import '../styles/CommonSpacing.css';
import '../styles/LanguageStyles.css';

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HindiHeader from "../components/Hindi/HindiHeader.jsx";
import HindiFooter from "../components/Hindi/HindiFooter.jsx";
import ScrollToTop from "../hooks/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";

// HindiApp is a wrapper that uses dedicated Hindi components
function HindiApp() {
  const location = useLocation();

  // Set HTML lang attribute to Hindi
  useEffect(() => {
    // Set language attribute
    document.documentElement.lang = 'hi';
    
    // Use Poppins font for Hindi as well (same as English)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
    
    // Store the selected language for persistence
    localStorage.setItem('needstation-language', 'hi');
    
    return () => {
      // Clean up when unmounting
      if (fontLink.parentNode) {
        fontLink.parentNode.removeChild(fontLink);
      }
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <HindiHeader />
      <main>
        <Outlet />
      </main>
      <HindiFooter />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default HindiApp;
