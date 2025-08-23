// RelatedServices.jsx
import styles from "./RelatedServices.module.css";
import { Link } from "react-router-dom";

const RelatedServices = ({ cards, heading, serviceContext }) => {
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
            state={{
              service: card.title,
              subService: card.title,
              description: card.description,
              serviceType: (() => {
                const t = card.title.toLowerCase();
                if (t.includes('cooking')) return 'cooking';
                if (t.includes('cleaning')) return 'cleaning';
                if (t.includes('laundry')) return 'laundry';
                if (t === 'electrician') return 'electrician';
                if (t === 'plumber') return 'plumber';
                if (t === 'water-supply') return 'water-supply';
                // Map sub-services to their parent serviceType
                const subToParent = {
                  'appliances': 'electrician',
                  'wiring': 'electrician',
                  'inverter': 'electrician',
                  'fan': 'electrician',
                  'mcb': 'electrician',
                  'book a visit': 'electrician',
                  'drainage': 'plumber',
                  'toilet': 'plumber',
                  'tap': 'plumber',
                  'water-pipes': 'plumber',
                  'water-filter': 'plumber',
                  'home-visit': 'plumber',
                  'water purifier': 'water-supply',
                  'water tank': 'water-supply',
                  'water truck': 'water-supply',
                  'underground tank': 'water-supply',
                  'motor': 'water-supply',
                };
                if (subToParent[t]) return subToParent[t];
                return t.replace(/\s+/g, '-').replace('assistance', '').replace('services', '').trim();
              })()
            }}
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
