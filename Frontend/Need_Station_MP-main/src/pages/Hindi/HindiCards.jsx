import styles from '../HomePage/Cards.module.css';

import image1 from '../../assets/images/cardImage1.jpg';
import image2 from '../../assets/images/cardImage2.jpeg';
import image3 from '../../assets/images/cardImage4.jpg';
import { Link } from 'react-router-dom';

const HindiCards = () => {
  return <>
    <section className={`py-5 ${styles["section"]}`}>
    <div className="container">
      <h2 className={`text-center mb-4 ${styles["heading"]}`}>हमारी सेवाएँ देखें</h2>
      <div className="row">
        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image1} className={`"card-img-top" ${styles["cardImage"]}`} alt="बुजुर्गों की देखभाल"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>बुजुर्गों की देखभाल</h5>
              <p className={`card-text ${styles["cardBody"]}`}>बुजुर्गों की विशिष्ट आवश्यकताओं को पूरा करने के लिए दयालु और पेशेवर देखभाल।</p>
              <Link to="/hi/caretaker" className={`btn btn-primary ${styles["cardButton"]}`}>और जानें</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image2} className="card-img-top" alt="बुनियादी जरूरतें"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>बुनियादी जरूरतें</h5>
              <p className={`card-text ${styles["cardBody"]}`}>विश्वसनीय स्थानीय इलेक्ट्रीशियन, प्लंबर और अन्य से भरोसेमंद घरेलू आवश्यकताएं।</p>
              <Link to="/hi/basic-needs-home" className={`btn btn-primary ${styles["cardButton"]}`}>और जानें</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image3} className="card-img-top" alt="घरेलू सेवाएँ"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>मेड सेवाएँ</h5>
              <p className={`card-text ${styles["cardBody"]}`}>आपके घर के लिए गुणवत्तापूर्ण सहायता और समर्पित हाउसकीपिंग</p>
              <Link to="/hi/maid-services" className={`btn btn-primary ${styles["cardButton"]}`}>और जानें</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </>
}

export default HindiCards;
