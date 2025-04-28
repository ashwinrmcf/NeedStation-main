import styles from "./SearchbarContainer.module.css";
import { FaSearch } from "react-icons/fa";

const SearchbarContainer = () => {
  return (
    <>
      <div className={styles.tagline}>
        Connecting Helpers and Clients for a Better Community
      </div>

      <div className={styles.searchbarContainer}>
        <div className={styles.searchbar}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchbarInput}
            type="text"
            placeholder="What do you need help with?"
          />
        </div>
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
