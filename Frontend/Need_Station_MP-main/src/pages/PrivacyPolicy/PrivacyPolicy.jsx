import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Privacy <span className={styles.highlight}>Policy</span></h1>
          <div className={styles.headerAccent}></div>
          <p className={styles.subtitle}>
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Personal Information</h3>
            <p className={styles.text}>
              When you create an account with NeedStation, we collect personal information such as:
            </p>
            <ul className={styles.list}>
              <li>Full name and contact information</li>
              <li>Email address and phone number</li>
              <li>Location and address details</li>
              <li>Profile picture and identification documents</li>
              <li>Payment information and billing details</li>
            </ul>
          </div>
          
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Service Information</h3>
            <p className={styles.text}>
              We collect information related to the services you request or provide:
            </p>
            <ul className={styles.list}>
              <li>Service preferences and requirements</li>
              <li>Booking history and transaction records</li>
              <li>Reviews and ratings</li>
              <li>Communication between users and service providers</li>
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Technical Information</h3>
            <p className={styles.text}>
              We automatically collect certain technical information when you use our platform:
            </p>
            <ul className={styles.list}>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and app interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔧</div>
              <h3 className={styles.cardTitle}>Service Delivery</h3>
              <p className={styles.cardText}>
                To connect you with qualified service providers and facilitate seamless service delivery.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🛡️</div>
              <h3 className={styles.cardTitle}>Safety & Security</h3>
              <p className={styles.cardText}>
                To verify identities, conduct background checks, and ensure the safety of all users.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>💬</div>
              <h3 className={styles.cardTitle}>Communication</h3>
              <p className={styles.cardText}>
                To send important updates, notifications, and facilitate communication between users.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📊</div>
              <h3 className={styles.cardTitle}>Platform Improvement</h3>
              <p className={styles.cardText}>
                To analyze usage patterns and improve our services, features, and user experience.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Information Sharing</h2>
          <div className={styles.highlightBox}>
            <h3 className={styles.highlightTitle}>We Never Sell Your Data</h3>
            <p className={styles.highlightText}>
              NeedStation does not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </div>
          
          <p className={styles.text}>We may share your information only in the following circumstances:</p>
          <div className={styles.sharingGrid}>
            <div className={styles.sharingItem}>
              <h4 className={styles.sharingTitle}>Service Providers</h4>
              <p className={styles.sharingText}>
                With helpers and service providers to facilitate service delivery and communication.
              </p>
            </div>
            <div className={styles.sharingItem}>
              <h4 className={styles.sharingTitle}>Legal Requirements</h4>
              <p className={styles.sharingText}>
                When required by law, court order, or to protect the rights and safety of our users.
              </p>
            </div>
            <div className={styles.sharingItem}>
              <h4 className={styles.sharingTitle}>Business Partners</h4>
              <p className={styles.sharingText}>
                With trusted partners who help us operate our platform, subject to strict confidentiality agreements.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Data Security</h2>
          <p className={styles.text}>
            We implement industry-standard security measures to protect your personal information:
          </p>
          <div className={styles.securityGrid}>
            <div className={styles.securityItem}>
              <div className={styles.securityIcon}>🔐</div>
              <h4 className={styles.securityTitle}>Encryption</h4>
              <p className={styles.securityText}>All data is encrypted in transit and at rest using advanced encryption standards.</p>
            </div>
            <div className={styles.securityItem}>
              <div className={styles.securityIcon}>🏢</div>
              <h4 className={styles.securityTitle}>Secure Servers</h4>
              <p className={styles.securityText}>Our servers are hosted in secure data centers with 24/7 monitoring and access controls.</p>
            </div>
            <div className={styles.securityItem}>
              <div className={styles.securityIcon}>👥</div>
              <h4 className={styles.securityTitle}>Access Control</h4>
              <p className={styles.securityText}>Limited access to personal data on a need-to-know basis with regular security training.</p>
            </div>
            <div className={styles.securityItem}>
              <div className={styles.securityIcon}>🔍</div>
              <h4 className={styles.securityTitle}>Regular Audits</h4>
              <p className={styles.securityText}>Regular security audits and vulnerability assessments to maintain high security standards.</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Your Rights</h2>
          <p className={styles.text}>
            You have the following rights regarding your personal information:
          </p>
          <div className={styles.rightsContainer}>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Access</h4>
              <p className={styles.rightText}>Request a copy of the personal information we hold about you.</p>
            </div>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Correction</h4>
              <p className={styles.rightText}>Update or correct any inaccurate or incomplete information.</p>
            </div>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Deletion</h4>
              <p className={styles.rightText}>Request deletion of your personal information, subject to legal requirements.</p>
            </div>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Portability</h4>
              <p className={styles.rightText}>Receive your data in a structured, machine-readable format.</p>
            </div>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Objection</h4>
              <p className={styles.rightText}>Object to certain types of processing of your personal information.</p>
            </div>
            <div className={styles.rightItem}>
              <h4 className={styles.rightTitle}>Restriction</h4>
              <p className={styles.rightText}>Request restriction of processing under certain circumstances.</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Cookies and Tracking</h2>
          <p className={styles.text}>
            We use cookies and similar technologies to enhance your experience on our platform:
          </p>
          <div className={styles.cookieTypes}>
            <div className={styles.cookieType}>
              <h4 className={styles.cookieTitle}>Essential Cookies</h4>
              <p className={styles.cookieText}>Required for basic platform functionality and security.</p>
            </div>
            <div className={styles.cookieType}>
              <h4 className={styles.cookieTitle}>Performance Cookies</h4>
              <p className={styles.cookieText}>Help us understand how you interact with our platform to improve performance.</p>
            </div>
            <div className={styles.cookieType}>
              <h4 className={styles.cookieTitle}>Functional Cookies</h4>
              <p className={styles.cookieText}>Remember your preferences and provide personalized features.</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Data Retention</h2>
          <p className={styles.text}>
            We retain your personal information only as long as necessary for the purposes outlined in this policy:
          </p>
          <ul className={styles.list}>
            <li>Account information: Retained while your account is active and for 3 years after account closure</li>
            <li>Transaction records: Retained for 7 years for legal and accounting purposes</li>
            <li>Communication logs: Retained for 2 years for quality assurance and dispute resolution</li>
            <li>Marketing data: Retained until you opt out or for 3 years of inactivity</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Children's Privacy</h2>
          <div className={styles.warningBox}>
            <h3 className={styles.warningTitle}>Age Restriction</h3>
            <p className={styles.warningText}>
              NeedStation is not intended for children under 18 years of age. We do not knowingly collect 
              personal information from children under 18. If you believe we have collected information 
              from a child under 18, please contact us immediately.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. International Data Transfers</h2>
          <p className={styles.text}>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place to protect your data in accordance with 
            applicable data protection laws.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new policy on our platform and updating the "Last updated" date. 
            Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.text}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <strong>Email:</strong> privacy@needstation.com
            </div>
            <div className={styles.contactItem}>
              <strong>Phone:</strong> +11 222 3333
            </div>
            <div className={styles.contactItem}>
              <strong>Address:</strong> 2972 Westheimer Rd, Santa Ana, Illinois 85486
            </div>
          </div>
        </div>
        
        <div className={styles.lastUpdated}>
          <p>Last Updated: January 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
