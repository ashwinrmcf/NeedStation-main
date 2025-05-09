import styles from "./SearchbarContainer.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchbarContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Service map with services and their corresponding URLs
  const serviceMap = new Map([
    ["electrician", "/electrician"],
    ["plumber", "/plumber"],
    ["water-supply", "/water-supply"],
    ["babysitter", "/babysitter"],
    ["caretaker", "/caretaker"],
    ["nurse", "/nurse"],
    ["paralysis-care", "/paralysis-care"],
    ["postnatal-care", "/postnatal-care"],
    ["health-checkup", "/health-checkup"],
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
      alert("Service not provided");
    }
  };

  const handleServiceClick = (service) => {
    setSearchTerm(service);
    navigate(serviceMap.get(service));
  };

  return (
    <>
      <div className={styles.tagline}>
        Connecting Helpers and Clients for a Better Community
      </div>

      <div className={`${styles.searchbarContainer} ${showDropdown && filteredServices.length > 0 ? styles.expanded : ''}`}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchbar}>
            <FaSearch className={styles.searchIcon} />
            <input
              className={styles.searchbarInput}
              type="text"
              placeholder="What do you need help with?"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => {
                const timer = setTimeout(() => setShowDropdown(false), 200);
                return () => clearTimeout(timer);
              }}
            />
          </div>
        </form>
        
        {showDropdown && filteredServices.length > 0 && (
          <div className={styles.dropdown}>
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
          <div className={styles.text}>Regular Users</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.infoData}>
          <div className={styles.number}>700+</div>
          
            <div className={styles.text}>Verified Helpers</div>
          
        </div>
      </div>
    </>
  );
};

export default SearchbarContainer;
