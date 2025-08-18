import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Hindi.css";

// Hindi version of the Footer component with pre-translated content
const HindiFooter = () => {
  return (
    <>
      <footer className="hindi-footer">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/hi"> 
              <h2>
                Need<span>Station</span>
              </h2> 
            </Link>
            <p className="payment-tagline">
              भुगतान को आसान, विश्वसनीय और सुरक्षित बनाने का एक नया तरीका।
            </p>
          </div>

          <div className="footer-sections">
            <div className="footer-links">
              <h3>उपयोगी लिंक</h3>
              <ul>
                <li><Link to="/hi/contact-us">संपर्क करें</Link></li>
                <li><Link to="/hi/how-it-works">यह कैसे काम करता है</Link></li>
                <li><Link to="/hi/faq">अक्सर पूछे जाने वाले प्रश्न</Link></li>
                <li><Link to="/hi/privacy-policy">गोपनीयता नीति</Link></li>
                <li><Link to="/hi/terms-and-services">नियम और सेवाएं</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>संपर्क</h3>
              <p>
                <IoCall /> <span> +11 222 3333</span> 
              </p>
              <p>
                <IoMdMail /> <span>mangcoding123@gmail.com</span> 
              </p>
              <p>
                <FaLocationDot /> <span>2972 वेस्टहाइमर रोड, सांता एना, इलिनोइस 85486</span> 
              </p>
            </div>
          </div>
        </div>
        
        <hr className="footer-separator" />
        
        <div className="footer-bottom">
          <div className="social-links">
            <div className="social-link">
              <FaFacebook />
            </div>
            <div className="social-link">
              <FaTwitter />
            </div>
            <div className="social-link">
              <BsInstagram />
            </div>
            <div className="social-link">
              <FaLinkedin />
            </div>
          </div>
          <div className="copyright">
            © कॉपीराइट द्वारा सुरक्षित। सभी अधिकार सुरक्षित।
          </div>
        </div>
      </footer>
    </>
  );
};

export default HindiFooter;
