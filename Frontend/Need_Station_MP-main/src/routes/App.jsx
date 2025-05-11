import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ScrollToTop from "../hooks/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import translationService from "../services/TranslationService";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dchmvabfy' } });
  const location = useLocation();

  const img = cld
    .image('')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));
  
  // Initialize translation service on first load
  useEffect(() => {
    // Apply translation if stored language exists
    const storedLang = localStorage.getItem('needstation-language');
    if (storedLang && storedLang !== 'en') {
      translationService.setLanguage(storedLang);
    }
  }, []); // Only run once on initial mount
  
  // Apply translations whenever the route changes
  useEffect(() => {
    // Skip initial render
    if (location.pathname) {
      // Use a longer delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        const storedLang = localStorage.getItem('needstation-language');
        if (storedLang && storedLang !== 'en') {
          // Directly translate the page without changing the stored language
          translationService.translatePage();
        }
      }, 500); // Increased delay for better reliability
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]); // Re-run when the route changes

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="container my-4">
        <AdvancedImage cldImg={img} />
      </div>
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;


