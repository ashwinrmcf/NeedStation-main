import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation(); // Access location object

  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to top on location change
    });
  }, [location]); // The effect runs whenever location changes

  return null;
};

export default ScrollToTop;
