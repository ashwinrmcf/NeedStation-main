// RelatedServices.jsx
import styles from "./RelatedServices.module.css";
import { Link } from "react-router-dom";

const RelatedServices = ({ cards, heading }) => {
  return (
    <div className={styles["container2"]}>
      <h1 id="Man">
        {heading.split("").map((letter, index) => (
          <span
            key={index}
            style={{
              animationDelay: `${index * 0.1}s`, // Dynamically calculate delay
            }}
            className={`${styles["letter"]} ${
              letter === " " ? styles["nextWord"] : ""
            }`}
          >
            {letter}
          </span>
        ))}
      </h1>

      <div className={styles["services"]} id="scrollBox">
        {cards.map((card) => (
          <Link
            to={card.link} 
            key={card.id}
            className={styles["service-card"]}
          >
            <div>
              <button
                className={styles["img2"]}
                style={{ backgroundImage: `url(${card.image})` }}
              ></button>
              <button className={styles["btn-text"]}>
                <h2>{card.title}</h2>
              </button>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;
