import styles from "../HomePage/SearchbarContainer.module.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Hindi/headline-fix.css"; // Import CSS for headline styling
import "../../components/Hindi/extreme-left.css"; // Import CSS for layout

const HindiSearchbarContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholder, setPlaceholder] = useState("मुझे इससे मदद चाहिए");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // State to hold the randomized services
  const [shuffledServices, setShuffledServices] = useState([]);
  
  // Initialize with comprehensive list of services with appropriate articles
  useEffect(() => {
    const services = [
      "एक इलेक्ट्रीशियन ⚡",
      "एक प्लंबर 🔧",
      "पानी की आपूर्ति 💧",
      "बुजुर्गों की देखभाल 👴",
      "एक लकवा देखभालकर्ता 🤲",
      "प्रसवोत्तर देखभाल 👶",
      "एक नर्स 👩‍⚕️",
      "एक बेबी सिटर 🧸",
      "स्वास्थ्य जांच 🩺",
      "खाना पकाने की सेवाएं 🍳",
      "कपड़े धोने की सेवाएं 🧺",
      "सफाई सेवाएं 🧹"
    ];
    
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    // Set the shuffled services to state
    setShuffledServices(shuffleArray(services));
  }, []);
  
  const navigate = useNavigate();
  
  // Type animation logic
  useEffect(() => {
    if (searchTerm || shuffledServices.length === 0) return; // Don't animate if user is typing or services not loaded
    
    const typeAnimation = () => {
      const currentWord = shuffledServices[wordIndex];
      const staticText = "मुझे इससे मदद चाहिए ";
      const cursor = "|"; // Cursor character
      
      if (isDeleting) {
        // Deleting characters
        setPlaceholder(staticText + currentWord.substring(0, charIndex - 1) + cursor);
        setCharIndex(charIndex - 1);
        setTypingSpeed(80); // Faster when deleting
      } else {
        // Adding characters
        setPlaceholder(staticText + currentWord.substring(0, charIndex + 1) + cursor);
        setCharIndex(charIndex + 1);
        setTypingSpeed(150); // Normal typing speed
      }
      
      // Change direction if reached end of word
      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
        setTypingSpeed(1500); // Pause before deleting
      } 
      // Move to next word if deleted everything
      else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % shuffledServices.length);
      }
    };
    
    const timer = setTimeout(typeAnimation, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholder, charIndex, wordIndex, isDeleting, typingSpeed, searchTerm, shuffledServices]);

  // Service map with services and their corresponding URLs
  const serviceMap = new Map([
    ["इलेक्ट्रीशियन", "/hi/electrician"],
    ["प्लंबर", "/hi/plumber"],
    ["पानी-आपूर्ति", "/hi/water-supply"],
    ["बेबीसिटर", "/hi/babysitter"],
    ["देखभालकर्ता", "/hi/caretaker"],
    ["नर्स", "/hi/nurse"],
    ["लकवा-देखभाल", "/hi/paralysis-care"],
    ["प्रसवोत्तर-देखभाल", "/hi/postnatal-care"],
    ["स्वास्थ्य-जांच", "/hi/health-checkup"],
  ]);

  // Get all services as an array
  const services = Array.from(serviceMap.keys());

  // Filter services based on search term and limit to 3 results
  const filteredServices = searchTerm
    ? services
        .filter(service =>
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3) // Limit to 3 results
    : [];
    
  const handleSearch = (e) => {
    e.preventDefault();
    const service = searchTerm.toLowerCase();
    
    if (serviceMap.has(service)) {
      navigate(serviceMap.get(service));
    } else {
      alert("सेवा उपलब्ध नहीं है");
    }
  };

  const handleServiceClick = (service) => {
    setSearchTerm(service);
    navigate(serviceMap.get(service));
  };

  return (
    <div className="hindi-searchbar-container">
      <div className="hindi-search-container">
        <div className="hindi-heading">
          <h1>
            <span className={styles.needText}>NEED</span>
            <span className={styles.stationText}>STATION</span>
          </h1>
          <div className="hindi-searchbar-title">
            कोई भी काम, कोई भी समय, हम हैं आपके साथ
          </div>
        </div>

        <div className="hindi-tagline">
          बेहतर समुदाय के लिए मददगारों और ग्राहकों को जोड़ना
        </div>

        <div className={`${styles.searchbarContainer} hindi-search-wrapper ${showDropdown && filteredServices.length > 0 ? styles.expanded : ''}`}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchbar}>
              <FaSearch className={styles.searchIcon} />
              <input
                className={`${styles.searchbarInput} hindi-search-input`}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  setShowDropdown(true);
                  // Reset placeholder to static text when focused
                  setPlaceholder("मुझे इससे मदद चाहिए");
                }}
                onBlur={() => {
                  const dropdownTimer = setTimeout(() => setShowDropdown(false), 200);
                  
                  // Resume animation if search field is empty
                  if (searchTerm === "") {
                    // Reset typing animation
                    setCharIndex(0);
                    setIsDeleting(false);
                  }
                  
                  return () => {
                    clearTimeout(dropdownTimer);
                  };
                }}
              />
            </div>
          </form>
          
          {showDropdown && filteredServices.length > 0 && (
            <div className={`${styles.dropdown} hindi-search-suggestions`}>
              {filteredServices.map((service) => (
                <div
                  key={service}
                  className={styles.dropdownItem}
                  onClick={() => handleServiceClick(service)}
                >
                  {service}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.infoData}>
            <div className={styles.number}>2500+</div>
            <div className={styles.text}>नियमित उपयोगकर्ता</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.infoData}>
            <div className={styles.number}>700+</div>
            <div className={styles.text}>सत्यापित मददगार</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiSearchbarContainer;
