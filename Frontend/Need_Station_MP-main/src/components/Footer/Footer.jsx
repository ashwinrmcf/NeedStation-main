import styles from "./Footer.module.css";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className={`${styles["footer"]}`}>
        <div className={`${styles["footer-top"]}`}>
          <div className={`${styles["footer-logo"]}`}>
            <Link to="/"> <h2>
              Need<span>Station</span>
            </h2> </Link>
            <p className={`${styles["payment-tagline"]}`}>
              A new way to make the payments easy, reliable and secure.
            </p>
          </div>

          <div className={`${styles["FirstBreakPoint"]}`}>
            <div className={`${styles["footer-links"]}`}>
              <h3>Useful Links</h3>
              <ul>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li>How it Works</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li><Link to="/terms-and-services">Terms & Services</Link></li>
              </ul>
            </div>

            <div className={`${styles["footer-contact"]}`}>
              <h3>Contact</h3>
              <p>
                 <IoCall /> <span> +11 222 3333</span> 
              </p>
              <p>
                <IoMdMail /> <span>mangcoding123@gmail.com</span> 
              </p>
              <p>
                <FaLocationDot /> <span>2972 Westheimer Rd, Santa Ana, Illinois 85486</span> 
              </p>
            </div>
          </div>
        </div>
        <hr className={`${styles["footer-separator"]}`} />

        <div className={`${styles["footer-bottom"]}`}>
          <p className={`${styles["copyright"]}`}>
            © Copyright All Rights Reserved.
          </p>
          <div className={`${styles["social-media"]}`}>
            <span>
              <BsInstagram />
            </span>{" "}
            {/*Instagram*/}
            <span>
              <FaFacebook />
            </span>{" "}
            {/*Facebook*/}
            <span>
              <FaTwitter />
            </span>{" "}
            {/*Twitter*/}
            <span>
              <FaLinkedin />
            </span>{" "}
            {/*LinkedIn*/}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
