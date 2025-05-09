import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import ScrollToTop from "../../hooks/ScrollToTop.jsx";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted", formData);
    setSubmitted(true);
  };

  return (
    <>
      <ScrollToTop />
      <main>
        <div className={styles["container"]}>
          {!submitted ? (
            <form className={styles["contact-form"]} onSubmit={handleSubmit}>
              <h2>Contact Us</h2>
              <p className={styles["subtitle"]}>
                Have questions or need assistance? We're here to help!
              </p>

              {/* Personal Information */}
              <div className={styles["form-section"]}>
                <h3>Your Information</h3>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message Details */}
              <div className={styles["form-section"]}>
                <h3>Message Details</h3>
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option className={styles["option"]} value="">
                    Select Subject
                  </option>
                  <option className={styles["option"]} value="general_inquiry">
                    General Inquiry
                  </option>
                  <option className={styles["option"]} value="service_request">
                    Service Request
                  </option>
                  <option className={styles["option"]} value="feedback">
                    Feedback
                  </option>
                  <option className={styles["option"]} value="complaint">
                    Complaint
                  </option>
                  <option
                    className={styles["option"]}
                    value="business_partnership"
                  >
                    Business Partnership
                  </option>
                </select>

                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Please describe your inquiry in detail"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Contact Preference */}
              <div className={styles["form-section"]}>
                <h3>Contact Preference</h3>
                <div className={styles["radio-group"]}>
                  <div className={styles["radio-option"]}>
                    <input
                      type="radio"
                      id="preferEmail"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === "email"}
                      onChange={handleChange}
                    />
                    <label htmlFor="preferEmail" className={styles["radio-label"]}>
                      Email
                    </label>
                  </div>

                  <div className={styles["radio-option"]}>
                    <input
                      type="radio"
                      id="preferPhone"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === "phone"}
                      onChange={handleChange}
                    />
                    <label htmlFor="preferPhone" className={styles["radio-label"]}>
                      Phone
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button className={styles["button"]} type="submit">
                Send Message
              </button>
            </form>
          ) : (
            <div className={styles["success-message"]}>
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We'll get back to you soon.</p>
              <Link to="/">
                <button className={styles["button"]}>Return to Home</button>
              </Link>
            </div>
          )}

          {/* Contact Information */}
          <div className={styles["contact-info"]}>
            <h3>Reach Us Directly</h3>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Email:</span>
              <span className={styles["info-value"]}>support@needstation.com</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Phone:</span>
              <span className={styles["info-value"]}>+91 123 456 7890</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Hours:</span>
              <span className={styles["info-value"]}>Mon-Sat: 9AM - 6PM</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Address:</span>
              <span className={styles["info-value"]}>
                123 Service Road, Tech Park, Bangalore, India 560001
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;