import styles from './Cards.module.css';

import image1 from '../../assets/images/cardImage1.jpg';
import image2 from '../../assets/images/cardImage2.jpeg';
import image3 from '../../assets/images/cardImage4.jpg';
import { Link } from 'react-router-dom';

const Cards = () => {
  return <>
    <section className={`py-5 ${styles["section"]}`}>
    <div className="container">
      <h2 className={`text-center mb-4 ${styles["heading"]}`}>Explore Our Services</h2>
      <div className="row">
        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image1} className={`"card-img-top" ${styles["cardImage"]}`} alt="Elder Care"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>Elder Care</h5>
              <p className={`card-text ${styles["cardBody"]}`}>Compassionate and professional care tailored to meet the unique needs of seniors.</p>
              <Link to="/caretaker" className={`btn btn-primary ${styles["cardButton"]}`}>Learn More</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image2} className="card-img-top" alt="Babysitting"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>Basic Needs</h5>
              <p className={`card-text ${styles["cardBody"]}`}>Reliable home essentials from trusted local electricians, plumbers, and more.</p>
              <Link to="/basic-needs-home" className={`btn btn-primary ${styles["cardButton"]}`}>Learn More</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card ${styles["card"]}`}>
            <img src={image3} className="card-img-top" alt="Household Services"/>
            <div className="card-body">
              <h5 className={`card-title ${styles["cardTitle"]}`}>Flat and Maid Services</h5>
              <p className={`card-text ${styles["cardBody"]}`}>Quality assistance for your home with rental flats and dedicated housekeeping</p>
              <Link to="/flat-rental-home" className={`btn btn-primary ${styles["cardButton"]}`}>Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </>
}

export default Cards;